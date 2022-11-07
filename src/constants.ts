import path from 'path';

export type UserType = 'customer' | 'agent' | 'administrator';

export const PORT = process.env.PORT || 3000;
export const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../databases/users.db');

export enum LoginError {
  NOT_FOUND = "We could not find your user. Are you registered?",
  WRONG_PASSWORD = "The password you entered appears to be incorrect. Please try again."
}
