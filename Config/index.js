import dotenv from 'dotenv';
dotenv.config();

export const { APP_PORT, DEBUG_MODE, DATABASE_URL, JWT_SECRET } = process.env;