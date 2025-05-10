import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CreateSupportUserDto } from '../../application/dto/create-support-user.dto';
import { UpdateSupportUserDto } from '../../application/dto/update-support-user.dto';
import { ChangePasswordDto } from '../../application/dto/change-password.dto';
import { CreateSupportUserUseCase } from '../../application/use-cases/create-support-user.use-case';
import { ListSupportUsersUseCase } from '../../application/use-cases/list-support-users.use-case';
import { GetSupportUserUseCase } from '../../application/use-cases/get-support-user.use-case';
import { UpdateSupportUserUseCase } from '../../application/use-cases/update-support-user.use-case';
import { DeleteSupportUserUseCase } from '../../application/use-cases/delete-support-user.use-case';
import { ChangeSupportUserStatusUseCase } from '../../application/use-cases/change-support-user-status.use-case';
import { ChangeSupportUserPasswordUseCase } from '../../application/use-cases/change-support-user-password.use-case';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';

@Controller('support-users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('super_admin')
export class SupportUserController {
  constructor(
    private readonly createUseCase: CreateSupportUserUseCase,
    private readonly listUseCase: ListSupportUsersUseCase,
    private readonly getUseCase: GetSupportUserUseCase,
    private readonly updateUseCase: UpdateSupportUserUseCase,
    private readonly deleteUseCase: DeleteSupportUserUseCase,
    private readonly changeStatusUseCase: ChangeSupportUserStatusUseCase,
    private readonly changePasswordUseCase: ChangeSupportUserPasswordUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateSupportUserDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  async findAll() {
    return this.listUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getUseCase.execute(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSupportUserDto) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id') id: string,
    @Body() body: { status: 'active' | 'inactive' },
  ) {
    return this.changeStatusUseCase.execute(id, body.status);
  }

  @Patch(':id/password')
  async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePasswordUseCase.execute(id, dto.new_password);
  }
}
