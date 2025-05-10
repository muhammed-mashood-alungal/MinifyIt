import * as bcrypt from 'bcryptjs';
import { HttpResponse } from '../constants/responseMessage.constants';
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = 10;
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error) {
    throw new Error(HttpResponse.ERROR_WHILE_HASHING_PASS);
  }
};

export const validatePassword = async (
  incomingPass: string,
  hashedPassword: string,
) => {
  try {
    return await bcrypt.compare(incomingPass, hashedPassword);
  } catch (error) {
    throw new Error(HttpResponse.ERROR_WHILE_HASHING_PASS);
  }
};
