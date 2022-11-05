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
