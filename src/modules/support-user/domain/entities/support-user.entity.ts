export class SupportUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  status: 'active' | 'inactive';
  role: 'super_admin' | 'support';
  createdAt: Date;
  lastLogin?: Date;
}
