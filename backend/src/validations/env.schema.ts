import {z} from 'zod'

export const envSchema = z.object({
    NODE_ENV:z.enum(['development','production']),
    PORT:z.string().optional(),
    DATABASE_URL:z.string().url(),
    SENDER_EMAIL:z.string(),
    NODEMAILER_PASSKEY:z.string(),
    JWT_SECRET:z.string()
})