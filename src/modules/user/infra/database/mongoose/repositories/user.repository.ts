import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userModel.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean();
  }

  async find(filter: any): Promise<User[]> {
    return this.userModel.find(filter).lean();
  }

  async softDelete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true },
    );
  }

  async updateStatus(id: string, status: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async updateMember(
    id: string,
    memberId: Types.ObjectId | null,
  ): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { memberId }, { new: true });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean();
  }

  async findWithPagination(
    filter: any,
    skip: number,
    limit: number,
  ): Promise<User[]> {
    return this.userModel.find(filter).skip(skip).limit(limit).lean();
  }

  async count(filter: any): Promise<number> {
    return this.userModel.countDocuments(filter);
  }
}
