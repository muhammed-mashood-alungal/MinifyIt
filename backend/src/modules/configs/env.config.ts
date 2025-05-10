import { envSchema } from 'src/validations/env.schema';
import * as dotenv from 'dotenv';
import { HttpResponse } from 'src/common/constants/responseMessage.constants';

dotenv.config()

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(HttpResponse.INVALID_ENV);
}


const envVars = parsed.data
export const env = {
  get NODE_ENV() {
    return envVars.NODE_ENV;
  },
  get PORT() {
    return envVars.PORT;
  },
  get DATABASE_URL() {
    return envVars.DATABASE_URL; 
  },
  get SENDER_EMAIL(){
    return envVars.SENDER_EMAIL
  },
  get NODEMAILER_PASSKEY(){
    return envVars.NODEMAILER_PASSKEY
  },
  get JWT_SECRET(){ 
    return envVars.JWT_SECRET
  },
  get CLIENT_URL(){
    return envVars.CLIENT_URL
  },
  get REDIS_URL(){
    return envVars.REDIS_URL
  }
};
