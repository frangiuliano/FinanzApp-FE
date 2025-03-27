export interface Space {
  _id: string;
  name: string;
  owner: string;
  members: string[];
  type: 'personal' | 'shared';
  description?: string;
  createdAt: string;
  updatedAt: string;
}