import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { env } from 'src/modules/configs/env.config';

const JWT_SECRET = env.JWT_SECRET as string;
export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 20000 });
};
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    console.error(err);
    return null;
  }
}
