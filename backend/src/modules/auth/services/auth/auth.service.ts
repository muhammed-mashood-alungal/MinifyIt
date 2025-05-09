import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/createUserDto.dto';
import { UserRepository } from '../../repositories/user.repositories';
import { hashPassword, validatePassword } from 'src/common/utils/bcrypt.util';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { generateOtp } from 'src/common/utils/otp.util';
import { sendOtp } from 'src/common/utils/sendEmail.util';
import { HttpResponse } from 'src/common/constants/responseMessage.constants';
import { string } from 'zod';
import { LoginDto } from '../../dto/login.dto';
import { generateToken } from 'src/common/utils/jwt.util';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  async signup(userData: CreateUserDto) {
    const IsExist = await this.userRepository.getUserByEmail(userData.email);
    if (IsExist) {
      throw new HttpException(
        HttpResponse.USER_ALREADY_EXIST,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await hashPassword(userData.password);

    const otp = generateOtp();

    await sendOtp(userData.email, otp);

    const response = await this.cacheManager.set(
      userData.email,
      JSON.stringify({
        ...userData,
        password: hashedPassword,
        otp,
      }),
      3600,
    );
    if (!response) {
      throw new HttpException(
        HttpResponse.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async verifyOtp(email: string, otp: string) {
    const userData = JSON.parse((await this.cacheManager.get(email)) as string);

    if (userData.otp != otp) {
      throw new HttpException(HttpResponse.INVALID_OTP, HttpStatus.BAD_REQUEST);
    }

    delete userData.otp;

    await this.userRepository.createUser(userData);
  }
  async resendOtp(email: string) {
    const otp = generateOtp();
    await sendOtp(email, otp);
    const prevUserData = JSON.parse(
      (await this.cacheManager.get(email)) as string,
    );
    await this.cacheManager.set(
      email,
      JSON.stringify({
        ...prevUserData,
        otp: otp,
      }),
      3600,
    );
  }

  async signIn(signInData: LoginDto) : Promise<string> {
    const user = await this.userRepository.getUserByEmail(signInData.email);

    if (!user) {
      throw new HttpException(
        HttpResponse.INVALID_CREDITIAL,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isVerified = validatePassword(signInData.password , user.password)
    if(!isVerified){
        throw new HttpException(
        HttpResponse.INVALID_CREDITIAL,
        HttpStatus.UNAUTHORIZED,
      );
    }


    const payload = {id : user._id , email : user.email}
    const token = await generateToken(payload)
    return token

  }
}
