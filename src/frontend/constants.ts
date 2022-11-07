export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

import { UserType } from '../constants';
export { UserType }

export type User = {
  username: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
} | null;

export type LoginResponse = {
  success: boolean;
  user: User | null;
  error: string | null;
}

export const alertIconColors = {
  success: '#61cf82',
  error: '#cf6161'
}

export const tileIcons = {
  login: {
    customer: "account",
    agent: "account-tie",
    administrator: "account-eye"
  }
}

export const tileColors = {
  login: {
    customer: "#d4ddd4",
    agent: "#dddbd4",
    administrator: "#ddd4d4"
  }
}
