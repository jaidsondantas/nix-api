import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateDepartmentUseCase } from '../../application/use-cases/create-department.use-case';
import { UpdateDepartmentUseCase } from '../../application/use-cases/update-department.use-case';
import { ListDepartmentsUseCase } from '../../application/use-cases/list-department.use-case';
import { FindDepartmentByIdUseCase } from '../../application/use-cases/find-department-by-id.use-case';
import { SoftDeleteDepartmentUseCase } from '../../application/use-cases/soft-delete-department.use-case';
import { CreateDepartmentDto } from '../../application/dto/create-department.dto';
import { UpdateDepartmentDto } from '../../application/dto/update-department.dto';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';
import { DepartmentFilterDto } from '../../application/dto/department-filter.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly createDepartmentUseCase: CreateDepartmentUseCase,
    private readonly updateDepartmentUseCase: UpdateDepartmentUseCase,
    private readonly listDepartmentsUseCase: ListDepartmentsUseCase,
    private readonly findDepartmentByIdUseCase: FindDepartmentByIdUseCase,
    private readonly softDeleteDepartmentUseCase: SoftDeleteDepartmentUseCase,
  ) {}

  @Post()
  @Roles('support', 'super_admin', 'admin', 'leader')
  async create(@Body() dto: CreateDepartmentDto, @Req() req: any) {
    const user = req.user;
    const isSuperUser =
      user?.role === 'super_admin' || user?.role === 'support';

    if (!isSuperUser) {
      dto.tenantId = user.tenantId;
    }

    const department = await this.createDepartmentUseCase.execute(dto);
    return { data: department };
  }

  @Get()
  @Roles('support', 'super_admin', 'admin', 'leader')
  async findAll(@Query() query: DepartmentFilterDto, @Req() req: any) {
    const user = req.user;
    const isSuperOrSupport =
      user?.role === 'super_admin' || user?.role === 'support';

    // O use-case recebe o filtro e o contexto do usuário
    return this.listDepartmentsUseCase.execute(
      {
        ...query,
        // Garante que tenantId/churchId do contexto prevaleçam se não for super/support
        tenantId: !isSuperOrSupport ? user.tenantId : query.tenantId,
        churchId:
          !isSuperOrSupport && user.role === 'leader'
            ? user.churchId
            : query.churchId,
      },
      isSuperOrSupport,
    );
  }

  @Get(':id')
  @Roles('support', 'super_admin', 'admin', 'leader')
  async findById(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    const isSuperOrSupport = ['support', 'super_admin'].includes(user.role);
    const isAdmin = user.role === 'admin';
    const isLeader = user.role === 'leader';

    const department = await this.findDepartmentByIdUseCase.execute(id);

    if (!isSuperOrSupport) {
      if (isAdmin) {
        if (
          department.tenantId &&
          String(department.tenantId) !== String(user.tenantId)
        ) {
          throw new ForbiddenException({
            message: 'Access denied to this department.',
          });
        }
      } else if (isLeader) {
        if (
          (department.tenantId &&
            String(department.tenantId) !== String(user.tenantId)) ||
          String(department.churchId) !== String(user.churchId)
        ) {
          throw new ForbiddenException({
            message: 'Access denied to this department.',
          });
        }
      }
    }

    return { data: department };
  }

  @Put(':id')
  @Roles('support', 'super_admin', 'admin', 'leader')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
    @Req() req: any,
  ) {
    const user = req.user;
    const isSuperUser =
      user?.role === 'super_admin' || user?.role === 'support';
    const department = await this.updateDepartmentUseCase.execute(
      id,
      dto,
      user.tenantId,
      isSuperUser,
    );
    return { data: department };
  }

  @Delete(':id')
  @Roles('support', 'super_admin', 'admin', 'leader')
  @HttpCode(204)
  async softDelete(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    const isSuperUser =
      user?.role === 'super_admin' || user?.role === 'support';
    await this.softDeleteDepartmentUseCase.execute(
      id,
      user.tenantId,
      isSuperUser,
    );
    return;
  }
}
