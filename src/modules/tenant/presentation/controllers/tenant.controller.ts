import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreateTenantDto } from '../../application/dto/create-tenant.dto';
import { UpdateTenantDto } from '../../application/dto/update-tenant.dto';
import { CreateTenantUseCase } from '../../application/use-cases/create-tenant.usecase';
import { ListTenantsUseCase } from '../../application/use-cases/list-tenants.usecase';
import { GetTenantUseCase } from '../../application/use-cases/get-tenant.usecase';
import { UpdateTenantUseCase } from '../../application/use-cases/update-tenant.usecase';
import { RemoveTenantUseCase } from '../../application/use-cases/remove-tenant.usecase';
import { SetTenantStatusUseCase } from '../../application/use-cases/set-tenant-status.usecase';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';

@Controller('tenants')
export class TenantController {
  constructor(
    private readonly createTenantUseCase: CreateTenantUseCase,
    private readonly listTenantsUseCase: ListTenantsUseCase,
    private readonly getTenantUseCase: GetTenantUseCase,
    private readonly updateTenantUseCase: UpdateTenantUseCase,
    private readonly removeTenantUseCase: RemoveTenantUseCase,
    private readonly setTenantStatusUseCase: SetTenantStatusUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    return this.createTenantUseCase.execute(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Get()
  async findAll() {
    return await this.listTenantsUseCase.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getTenantUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.updateTenantUseCase.execute(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.removeTenantUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin')
  @Patch(':id/status')
  async setStatus(
    @Param('id') id: string,
    @Body('status') status: 'active' | 'inactive',
  ) {
    return await this.setTenantStatusUseCase.execute(id, status);
  }
}
