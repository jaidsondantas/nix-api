// src/modules/church/application/use-cases/list-churches.usecase.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';
import { ChurchFilterDto } from '../dto/church-filter.dto';
import { Church } from '../../domain/entities/church.entity';

@Injectable()
export class ListChurchesUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(
    filterDto: ChurchFilterDto,
    isSupport: boolean,
  ): Promise<{
    data: Church[];
    meta: { page: number; limit: number; total: number; hasNextPage: boolean };
  }> {
    const {
      tenantId,
      churchId,
      name,
      status,
      type,
      page = 1,
      limit = 20,
    } = filterDto;

    const filter: any = {};
    if (churchId) filter._id = churchId;
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (tenantId && isSupport) filter.tenantId = tenantId;
    if (!isSupport) filter.tenantId = tenantId; // tenantId já foi forçado no controller

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.churchRepo.findAllPaginated(filter, skip, limit),
      this.churchRepo.count(filter),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        hasNextPage: skip + data.length < total,
      },
    };
  }

  async findByIdWithTenantCheck(
    id: string,
    user: any,
    isSupport: boolean,
  ): Promise<Church | null> {
    const church = await this.churchRepo.findById(id);
    if (!church) return null;
    if (!isSupport && church.tenantId.toString() !== user.tenantId) {
      throw new ForbiddenException('Access denied to this church');
    }
    return church;
  }
}
