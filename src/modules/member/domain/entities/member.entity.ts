// domain/entities/member.entity.ts
import { Address } from '../value-objects/address.vo';

export class Member {
  _id?: string;
  churchId: string;
  tenantId: string;
  fullName: string;
  socialName?: string;
  gender?: 'male' | 'female' | 'other' | 'preferNotToSay';
  email?: string;
  phone?: string;
  birthDate?: Date;
  cpf?: string;
  maritalStatus?: 'single' | 'married' | 'widowed' | 'divorced';
  baptismDate?: Date;
  memberSince?: Date;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt?: Date;
  address?: Address;
  group?: string;
  communityRole?: string;
}
