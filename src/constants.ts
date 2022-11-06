import path from 'path';

export type UserType = 'customer' | 'agent' | 'administrator';

export const PORT = process.env.PORT || 3000;
export const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../databases/users.db');
