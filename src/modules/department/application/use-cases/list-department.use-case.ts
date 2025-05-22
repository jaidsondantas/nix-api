import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../infra/database/mongoose/repositories/department.repository';
import { DepartmentFilterDto } from '../dto/department-filter.dto';
import { Types } from 'mongoose';

@Injectable()
export class ListDepartmentsUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    filters: DepartmentFilterDto,
    isSuperOrSupport: boolean,
  ): Promise<{ data: any[]; meta: any }> {
    const { page = 1, limit = 20, ...rest } = filters;
    const skip = (page - 1) * limit;

    // Monta filtro MongoDB
    const mongoFilter: any = {};
    if (rest.status) mongoFilter.status = rest.status;
    if (rest.type) mongoFilter.type = rest.type;
    if (rest.churchId) mongoFilter.churchId = new Types.ObjectId(rest.churchId);
    if (rest.name) mongoFilter.name = { $regex: rest.name, $options: 'i' };

    // tenantId só se for super/support, senão sempre do contexto
    if (isSuperOrSupport && rest.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(rest.tenantId);
    } else if (!isSuperOrSupport && filters.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(filters.tenantId);
    }

    const [departments, total] = await Promise.all([
      this.departmentRepository.find(mongoFilter, { skip, limit }),
      this.departmentRepository.count(mongoFilter),
    ]);

    return {
      data: departments,
      meta: {
        page,
        limit,
        total,
        hasNextPage: page * limit < total,
      },
    };
  }
}
