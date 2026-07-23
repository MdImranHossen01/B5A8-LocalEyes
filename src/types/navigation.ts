export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
}

export interface UserData {
  name: string;
  role: 'user' | 'tourist' | 'admin';
  email: string;
}