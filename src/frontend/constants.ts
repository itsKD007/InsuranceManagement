export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

type User = {
  username: string;
  name: string;
  email: string;
  phone: string;
  type: 'customer' | 'agent' | 'administrator';
} | null;

export type AppState = {
  isLoggedIn: boolean;
  user: User;
};

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
