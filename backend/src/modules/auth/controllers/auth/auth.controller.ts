import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from '../../dto/createUserDto.dto';
import { AllExceptionsFilter } from 'src/common/filters/http-exception.filter';
import { AuthService } from '../../services/auth/auth.service';
import { Response } from 'express';
import { successResponse } from 'src/common/utils/reponse.util';
import { HttpResponse } from 'src/common/constants/responseMessage.constants';
import { VerifyOtpDto } from '../../dto/verifyOtp.dto';
import { ResendOtpDto } from '../../dto/resendOtp.dto';
import { LoginDto } from '../../dto/login.dto';

@Controller('auth')
@UseFilters(new AllExceptionsFilter())
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('signup')
  async signUp(@Body() userData: CreateUserDto, @Res() res: Response) {
    await this.authServices.signup(userData);
    successResponse(
      res,
      HttpStatus.CREATED,
      HttpResponse.OTP_SEND_SUCCESSFULLY,
    );
  }
  @Post('verify-otp')
  async verifyOtp(@Body() body: VerifyOtpDto, @Res() res: Response) {
    const { email, otp } = body;
    await this.authServices.verifyOtp(email, otp);
    successResponse(res, HttpStatus.OK, HttpResponse.OTP_VERIFIED);
  }
  @Post('resend-otp')
  async resendOtp(@Body() body: ResendOtpDto, @Res() res: Response) {
    const { email } = body;
    await this.authServices.resendOtp(email);
    successResponse(res, HttpStatus.OK, HttpResponse.OTP_RESENDED);
  }

  @Post('signin')
  async singIn(@Body() signInData : LoginDto , @Res() res : Response){
    const token = await this.authServices.signIn(signInData)
    successResponse(res , HttpStatus.OK , HttpResponse.LOGIN_SUCCESS , {token})
  }
}
