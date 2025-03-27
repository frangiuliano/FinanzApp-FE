export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
