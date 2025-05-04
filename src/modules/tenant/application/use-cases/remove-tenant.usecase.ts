import { Injectable, NotFoundException } from '@nestjs/common';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';

@Injectable()
export class RemoveTenantUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(id: string): Promise<Tenant> {
    const removed = await this.tenantRepo.softDelete(id);
    if (!removed) throw new NotFoundException({ error: 'Tenant not found' });
    return removed;
  }
}
