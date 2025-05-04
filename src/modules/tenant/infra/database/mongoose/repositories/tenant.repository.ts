import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tenant } from '../schemas/tenant.schema';

@Injectable()
export class TenantRepository {
  constructor(
    @InjectModel('Tenant') private readonly tenantModel: Model<Tenant>,
  ) {}

  async create(data: Partial<Tenant>): Promise<Tenant> {
    const created = await this.tenantModel.create(data);
    return created.toObject();
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantModel.find().lean();
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.tenantModel.findById(id).lean();
  }

  async findByDocument(document: string): Promise<Tenant | null> {
    return this.tenantModel.findOne({ document }).lean();
  }

  async update(id: string, data: Partial<Tenant>): Promise<Tenant | null> {
    return this.tenantModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async softDelete(id: string): Promise<Tenant | null> {
    return this.tenantModel
      .findByIdAndUpdate(id, { status: 'inactive' }, { new: true })
      .lean();
  }

  async setStatus(
    id: string,
    status: 'active' | 'inactive',
  ): Promise<Tenant | null> {
    return this.tenantModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .lean();
  }
}
