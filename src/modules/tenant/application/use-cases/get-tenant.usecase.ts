import { Injectable, NotFoundException } from '@nestjs/common';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';

@Injectable()
export class GetTenantUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepo.findById(id);
    if (!tenant) {
      throw new NotFoundException({ error: 'Tenant not found' });
    }
    return tenant;
  }
}
