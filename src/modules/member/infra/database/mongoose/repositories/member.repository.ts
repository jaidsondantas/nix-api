// infra/database/mongoose/repositories/member.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MemberDocument } from '../schemas/member.schema';

@Injectable()
export class MemberRepository {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<MemberDocument>,
  ) {}

  async create(data: any) {
    return this.memberModel.create(data);
  }

  async update(id: string, data: any) {
    return this.memberModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findById(id: string) {
    return this.memberModel.findById(id);
  }

  async find(filter: any, options: any) {
    return this.memberModel
      .find(filter)
      .skip(options.skip)
      .limit(options.limit);
  }

  async softDelete(id: string) {
    return this.memberModel.findByIdAndDelete(id);
  }

  async updateStatus(id: string, status: string) {
    return this.memberModel.findByIdAndUpdate(id, { status }, { new: true });
  }

  async count(filter: any) {
    return this.memberModel.countDocuments(filter);
  }
}
