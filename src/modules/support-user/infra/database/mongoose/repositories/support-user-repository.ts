import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SupportUser,
  SupportUserDocument,
} from '../schemas/support-user.schema';

@Injectable()
export class SupportUserRepository {
  constructor(
    @InjectModel('SupportUser')
    private readonly supportUserModel: Model<SupportUserDocument>,
  ) {}

  async create(user: Partial<SupportUser>): Promise<SupportUser> {
    const created = new this.supportUserModel(user);
    const saved = await created.save();
    return saved.toObject();
  }

  async findAll(): Promise<SupportUser[]> {
    return this.supportUserModel.find().lean().exec();
  }

  async findById(id: string): Promise<SupportUser | null> {
    return this.supportUserModel.findById(id).lean().exec();
  }

  async findByEmail(email: string): Promise<SupportUser | null> {
    return this.supportUserModel.findOne({ email }).lean().exec();
  }

  async update(
    id: string,
    update: Partial<SupportUser>,
  ): Promise<SupportUser | null> {
    return this.supportUserModel
      .findByIdAndUpdate(id, update, { new: true })
      .lean()
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.supportUserModel.findByIdAndDelete(id).exec();
  }
}
