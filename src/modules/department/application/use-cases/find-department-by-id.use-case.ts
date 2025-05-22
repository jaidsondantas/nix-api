import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '../../infra/database/mongoose/repositories/department.repository';
import { DepartmentDocument } from '../../infra/database/mongoose/schemas/department.schema';

@Injectable()
export class FindDepartmentByIdUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {
  }

  async execute(id: string): Promise<DepartmentDocument> {
    const dept = await this.departmentRepository.findById(id);
    if (!dept) throw new NotFoundException('Department not found.');
    return dept;
  }
}
