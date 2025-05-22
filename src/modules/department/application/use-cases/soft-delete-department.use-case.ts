import { Injectable, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from '../../infra/database/mongoose/repositories/department.repository';
import { DepartmentDocument } from '../../infra/database/mongoose/schemas/department.schema';

@Injectable()
export class SoftDeleteDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    id: string,
    tenantId: string,
    isSuperUser: boolean,
  ): Promise<DepartmentDocument> {
    const deleted = await this.departmentRepository.softDelete(
      id,
      tenantId,
      isSuperUser,
    );
    if (!deleted)
      throw new NotFoundException('Department not found or forbidden.');
    return deleted;
  }
}
