import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';

@Injectable()
export class SetTenantStatusUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(id: string, status: 'active' | 'inactive'): Promise<Tenant> {
    if (!['active', 'inactive'].includes(status)) {
      throw new BadRequestException({ error: 'Invalid status value' });
    }
    const updated = await this.tenantRepo.setStatus(id, status);
    if (!updated) throw new NotFoundException({ error: 'Tenant not found' });
    return updated;
  }
}
