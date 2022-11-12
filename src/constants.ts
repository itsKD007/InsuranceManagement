import path from 'path';
import { Request } from 'express';

import {
  UserType,
  User as FrontendUser,
  Customer as FrontendCustomer,
  Agent as FrontendAgent,
  LoginResponseBody,
  RegisterResponseBody
} from './frontend/constants';

export {
  UserType,
  FrontendUser,
  FrontendAgent,
  FrontendCustomer,
  LoginResponseBody,
  RegisterResponseBody
};

export interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
    type: UserType;
  }
}

export interface RegisterRequestBody {
  username: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  type: UserType.CUSTOMER | UserType.AGENT;
}

export interface RegisterRequest extends Request {
  body: RegisterRequestBody;
}

export interface Customer {
  customerId: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

export interface Agent {
  agentId: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  areaCode: number;
}

export interface Admin {
  adminId: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

export const PORT = process.env.PORT || 3000;
export const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../databases/users.db');

export enum LoginErrorMessage {
  NOT_FOUND = "We could not find your user. Are you registered?",
  WRONG_PASSWORD = "The password you entered appears to be incorrect. Please try again."
}

export enum RegisterErrorMessage {
  ALREADY_EXISTS = "This username already exists in our database. Please choose another username!",
}
