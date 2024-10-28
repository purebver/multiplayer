import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 'localhost';
export const HOST = process.env.HOST || '5555';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1';
