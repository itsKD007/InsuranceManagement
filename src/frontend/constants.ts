export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

type User = {
  name: string;
  email: string;
  phone: string;
} | null;

export type AppState = {
  isLoggedIn: boolean;
  user: User;
};
