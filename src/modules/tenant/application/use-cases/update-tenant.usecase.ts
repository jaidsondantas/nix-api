import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTenantDto } from '../dto/update-tenant.dto';
import { Tenant } from '../../domain/entities/tenant.entity';
import { TenantRepository } from '../../infra/database/mongoose/repositories/tenant.repository';
import { TenantDocument } from '../../infra/database/mongoose/schemas/tenant.schema';

@Injectable()
export class UpdateTenantUseCase {
  constructor(private readonly tenantRepo: TenantRepository) {}

  async execute(id: string, dto: UpdateTenantDto): Promise<Tenant> {
    if (dto.document) {
      const existing = (await this.tenantRepo.findByDocument(
        dto.document,
      )) as TenantDocument;
      if (existing && existing._id !== id) {
        throw new ConflictException({ error: 'Document already exists' });
      }
    }
    const updated = await this.tenantRepo.update(id, dto);
    if (!updated) throw new NotFoundException({ error: 'Tenant not found' });
    return updated;
  }
}
