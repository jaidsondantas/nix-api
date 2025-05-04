import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from './infra/database/mongoose/schemas/tenant.schema';
import { TenantController } from './presentation/controllers/tenant.controller';
import { TenantRepository } from './infra/database/mongoose/repositories/tenant.repository';
import { CreateTenantUseCase } from './application/use-cases/create-tenant.usecase';
import { ListTenantsUseCase } from './application/use-cases/list-tenants.usecase';
import { GetTenantUseCase } from './application/use-cases/get-tenant.usecase';
import { UpdateTenantUseCase } from './application/use-cases/update-tenant.usecase';
import { RemoveTenantUseCase } from './application/use-cases/remove-tenant.usecase';
import { SetTenantStatusUseCase } from './application/use-cases/set-tenant-status.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  controllers: [TenantController],
  providers: [
    TenantRepository,
    CreateTenantUseCase,
    ListTenantsUseCase,
    GetTenantUseCase,
    UpdateTenantUseCase,
    RemoveTenantUseCase,
    SetTenantStatusUseCase,
  ],
})
export class TenantModule {}
