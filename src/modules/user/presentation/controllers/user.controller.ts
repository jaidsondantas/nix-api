import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/list-users.use-case';
import { SoftDeleteUserUseCase } from '../../application/use-cases/soft-delete-user.use-case';
import { PatchUserStatusUseCase } from '../../application/use-cases/patch-user-status.use-case';
import { PatchUserMemberUseCase } from '../../application/use-cases/patch-user-member.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { PatchUserStatusDto } from '../../application/dto/patch-user-status.dto';
import { PatchUserMemberDto } from '../../application/dto/patch-user-member.dto';
import { UserFilterDto } from "../../application/dto/user-filter.dto";

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUC: CreateUserUseCase,
    private readonly updateUserUC: UpdateUserUseCase,
    private readonly getUserUC: GetUserUseCase,
    private readonly listUsersUC: ListUsersUseCase,
    private readonly softDeleteUserUC: SoftDeleteUserUseCase,
    private readonly patchUserStatusUC: PatchUserStatusUseCase,
    private readonly patchUserMemberUC: PatchUserMemberUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.createUserUC.execute(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin', 'leader')
  @Get()
  async list(@Query() query: UserFilterDto, @Req() req) {
    const user = req.user;
    const isSuperOrSupport = ['super_admin', 'support'].includes(user.role);

    // Para não-super_admin/support, ignore tenantId do query e use do contexto
    if (!isSuperOrSupport) {
      query.tenantId = user.tenantId;
    }

    // Para admins comuns, nunca permita acesso a outros tenants
    if (!isSuperOrSupport && query.tenantId !== user.tenantId) {
      query.tenantId = user.tenantId;
    }

    // Paginação segura
    query.page = query.page || 1;
    query.limit = Math.min(query.limit || 20, 100);

    return this.listUsersUC.execute(query, isSuperOrSupport);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin', 'leader')
  @Get(':id')
  async get(@Param('id') id: string, @Req() req) {
    const user = req.user;
    const isSuperOrSupport = ['super_admin', 'support'].includes(user.role);
    return this.getUserUC.execute(id, user, isSuperOrSupport);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUserUC.execute(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin')
  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    return this.softDeleteUserUC.execute(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin')
  @Patch(':id/status')
  async patchStatus(@Param('id') id: string, @Body() dto: PatchUserStatusDto) {
    return this.patchUserStatusUC.execute(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'support', 'admin')
  @Patch(':id/member')
  async patchMember(@Param('id') id: string, @Body() dto: PatchUserMemberDto) {
    return this.patchUserMemberUC.execute(id, dto);
  }
}
