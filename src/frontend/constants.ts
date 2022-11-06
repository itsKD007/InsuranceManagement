export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

export type UserType = 'customer' | 'agent' | 'administrator';

export type User = {
  username: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
} | null;

export type LoginResponse = {
  success: boolean;
  user: User;
}

export const tileIcons = {
  login: {
    customer: "mdi:account",
    agent: "mdi:account-tie",
    administrator: "mdi:account-eye"
  }
}

export const tileColors = {
  login: {
    customer: "#d4ddd4",
    agent: "#dddbd4",
    administrator: "#ddd4d4"
  }
}
