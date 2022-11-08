export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

export enum UserType {
  CUSTOMER = 'customer',
  AGENT = 'agent',
  ADMIN = 'admin'
}

export interface User {
  username: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
}

export interface Customer extends User {
  customerId: number;
  type: UserType.CUSTOMER;
}

export interface Agent extends User {
  agentId: number;
  areaCode: number;
  type: UserType.AGENT;
}

export interface LoginResponseBody {
  success: boolean;
  user: User | null;
  error: string | null;
}

export type RegisterResponseBody = LoginResponseBody;

export const alertIconColors = {
  success: '#61cf82',
  error: '#cf6161'
}

export const tileIcons = {
  login: {
    customer: "account",
    agent: "account-tie",
    admin: "account-eye"
  }
}

export const tileColors = {
  login: {
    customer: "#d4ddd4",
    agent: "#dddbd4",
    admin: "#ddd4d4"
  }
}
