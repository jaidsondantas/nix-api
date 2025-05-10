import { Injectable } from '@nestjs/common';
import { ChurchRepository } from '../../infra/database/mongoose/repositories/church.repository';
import { Church } from '../../domain/entities/church.entity';

@Injectable()
export class ListChurchesUseCase {
  constructor(private readonly churchRepo: ChurchRepository) {}

  async execute(
    filter: { tenantId?: string; status?: string } = {},
  ): Promise<Church[]> {
    const query: any = {};
    if (filter.tenantId) query.tenantId = filter.tenantId;
    if (filter.status) query.status = filter.status;
    return this.churchRepo.findAll(query);
  }
}
