import { Injectable } from '@nestjs/common';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';

@Injectable()
export class ListTenantsUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(): Promise<Tenant[]> {
    return this.tenantRepo.findAll();
  }
}
