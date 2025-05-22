import { Types } from 'mongoose';

export class Department {
  _id?: Types.ObjectId;
  tenantId: Types.ObjectId;
  churchId: Types.ObjectId;
  name: string;
  type: string;
  description?: string;
  status: string;
  leaderId?: Types.ObjectId;
  createdAt?: Date;
}
