import { BadRequestException, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../infra/database/mongoose/repositories/department.repository';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Types } from 'mongoose';
import { DepartmentDocument } from '../../infra/database/mongoose/schemas/department.schema';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(dto: CreateDepartmentDto): Promise<DepartmentDocument> {
    const exists = await this.departmentRepository.findByChurchIdAndName(
      dto.churchId,
      dto.name,
    );
    if (exists)
      throw new BadRequestException(
        'Department name must be unique within church.',
      );

    const data = {
      ...dto,
      tenantId: new Types.ObjectId(dto.tenantId),
      churchId: new Types.ObjectId(dto.churchId),
      leaderId: dto.leaderId ? new Types.ObjectId(dto.leaderId) : undefined,
    };

    return this.departmentRepository.create(data);
  }
}
