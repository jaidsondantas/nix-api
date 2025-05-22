import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from "mongoose";
import { Department } from 'src/modules/department/domain/entities/department.entity';
import { DepartmentDocument } from '../schemas/department.schema';

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectModel('Department')
    private readonly departmentModel: Model<DepartmentDocument>,
  ) {}

  async create(dept: Partial<Department>): Promise<DepartmentDocument> {
    return this.departmentModel.create(dept);
  }

  async findById(id: string): Promise<DepartmentDocument | null> {
    const filter: any = { _id: id };
    return this.departmentModel.findOne(filter).lean();
  }

  async find(
    filter: any,
    options: { skip: number; limit: number },
  ): Promise<DepartmentDocument[]> {
    return this.departmentModel
      .find(filter)
      .skip(options.skip)
      .limit(options.limit)
      .sort({ createdAt: -1 })
      .lean();
  }

  async count(filter: any): Promise<number> {
    return this.departmentModel.countDocuments(filter);
  }

  async update(
    id: string,
    update: Partial<DepartmentDocument>,
    tenantId?: string,
    isSuperUser = false,
  ): Promise<DepartmentDocument | null> {
    const filter: any = { _id: id };
    if (!isSuperUser) filter.tenantId = new Types.ObjectId(tenantId);
    delete update.createdAt;
    return this.departmentModel
      .findOneAndUpdate(filter, update, { new: true })
      .lean();
  }

  async softDelete(
    id: string,
    tenantId?: string,
    isSuperUser = false,
  ): Promise<DepartmentDocument | null> {
    const filter: any = { _id: id };
    if (!isSuperUser) filter.tenantId = tenantId;
    return this.departmentModel
      .findOneAndUpdate(filter, { status: 'inactive' }, { new: true })
      .lean();
  }

  async findByChurchIdAndName(
    churchId: string,
    name: string,
    excludeId?: string,
  ): Promise<DepartmentDocument | null> {
    const filter: any = { churchId, name };
    if (excludeId) filter._id = { $ne: excludeId };
    return this.departmentModel.findOne(filter).lean();
  }
}
