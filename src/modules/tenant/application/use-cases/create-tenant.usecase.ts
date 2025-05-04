import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from '../../presentation/dto/create-tenant.dto';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';

@Injectable()
export class CreateTenantUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(dto: CreateTenantDto): Promise<Tenant> {
    // Check uniqueness
    const exists = await this.tenantRepo.findByDocument(dto.document);
    if (exists)
      throw new ConflictException({ error: 'Document already exists' });

    // Set defaults
    const tenant: Partial<Tenant> = {
      ...dto,
      status: dto.status || 'active',
      subscriptionPlan: dto.subscriptionPlan || 'free',
      createdAt: new Date(),
    };
    return this.tenantRepo.create(tenant);
  }
}
