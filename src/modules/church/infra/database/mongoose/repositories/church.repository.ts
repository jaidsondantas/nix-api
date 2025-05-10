import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Church } from '../../../../domain/entities/church.entity';

@Injectable()
export class ChurchRepository {
  constructor(
    @InjectModel('Church') private readonly churchModel: Model<Church>,
  ) {}

  async create(church: Church): Promise<Church> {
    const created = await this.churchModel.create({
      ...church,
    });
    return created.toObject();
  }

  async update(id: string, church: Partial<Church>): Promise<Church> {
    const updated = await this.churchModel.findByIdAndUpdate(
      id,
      { $set: church },
      { new: true },
    );
    return updated?.toObject();
  }

  async findById(id: string): Promise<Church | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const found = await this.churchModel.findById(id);
    return found ? found.toObject() : null;
  }

  async findAll(filter: any = {}): Promise<Church[]> {
    const docs = await this.churchModel.find(filter).lean();
    return docs;
  }

  async delete(id: string): Promise<void> {
    await this.churchModel.findByIdAndUpdate(id, { status: 'inactive' });
  }

  async findByNameAndTenant(
    name: string,
    tenantId: string,
  ): Promise<Church | null> {
    const found = await this.churchModel.findOne({ name, tenantId });
    return found ? found.toObject() : null;
  }
}
