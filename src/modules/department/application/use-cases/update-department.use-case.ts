import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DepartmentRepository } from '../../infra/database/mongoose/repositories/department.repository';
import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Types } from 'mongoose';
import { DepartmentDocument } from '../../infra/database/mongoose/schemas/department.schema';

@Injectable()
export class UpdateDepartmentUseCase {
  constructor(private readonly departmentRepository: DepartmentRepository) {}

  async execute(
    id: string,
    dto: UpdateDepartmentDto,
    tenantId: string,
    isSuperUser: boolean,
  ): Promise<DepartmentDocument> {
    if ('createdAt' in dto) delete dto['createdAt'];

    // Checa unicidade se nome ou churchId forem alterados
    if (dto.name || dto.churchId) {
      const dept = await this.departmentRepository.findByChurchIdAndName(
        dto.churchId ?? undefined,
        dto.name ?? undefined,
        id,
      );
      if (dept)
        throw new BadRequestException(
          'Department name must be unique within church.',
        );
    }

    const data: any = { ...dto };
    if (dto.tenantId) data.tenantId = new Types.ObjectId(dto.tenantId);
    if (dto.churchId) data.churchId = new Types.ObjectId(dto.churchId);
    if (dto.leaderId) data.leaderId = new Types.ObjectId(dto.leaderId);

    const updated = await this.departmentRepository.update(
      id,
      data,
      tenantId,
      isSuperUser,
    );
    if (!updated)
      throw new NotFoundException('Department not found or forbidden.');
    return updated;
  }
}
