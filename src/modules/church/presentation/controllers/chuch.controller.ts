import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateChurchUseCase } from '../../application/use-cases/create-church.usecase';
import { UpdateChurchUseCase } from '../../application/use-cases/update-church.usecase';
import { DeleteChurchUseCase } from '../../application/use-cases/delete-church.usecase';
import { ChangeChurchStatusUseCase } from '../../application/use-cases/change-church-status.usecase';
import { ListChurchesUseCase } from '../../application/use-cases/list-churches.usecase';
import { CreateChurchDto } from '../../application/dto/create-church.dto';
import { UpdateChurchDto } from '../../application/dto/update-church.dto';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { assertTenantAccess } from '../../../../shared/utils/assert-tenant-access';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';

@UseGuards(JwtAuthGuard)
@Controller('churches')
export class ChurchController {
  constructor(
    private readonly createChurch: CreateChurchUseCase,
    private readonly updateChurch: UpdateChurchUseCase,
    private readonly deleteChurch: DeleteChurchUseCase,
    private readonly changeStatus: ChangeChurchStatusUseCase,
    private readonly listChurches: ListChurchesUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateChurchDto, @Req() req) {
    return this.createChurch.execute(dto);
  }

  @Get()
  async findAll(@Query('tenantId') tenantId: string, @Req() req) {
    const user = req.user;
    const filter: any = {};
    if (user.role === 'super_admin' || user.role === 'support') {
      if (tenantId) filter.tenantId = tenantId;
    } else if (user.tenantId) {
      filter.tenantId = user.tenantId;
    } else {
      throw new ForbiddenException();
    }
    return this.listChurches.execute(filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const church = await this.listChurches['churchRepo'].findById(id);
    if (!church) throw new NotFoundException('Church not found');
    assertTenantAccess(req.user, church.tenantId);
    return church;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateChurchDto,
    @Req() req,
  ) {
    const church = await this.listChurches['churchRepo'].findById(id);
    if (!church) throw new NotFoundException('Church not found');
    assertTenantAccess(req.user, church.tenantId);
    return this.updateChurch.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const church = await this.listChurches['churchRepo'].findById(id);
    if (!church) throw new NotFoundException('Church not found');
    assertTenantAccess(req.user, church.tenantId);
    await this.deleteChurch.execute(id);
    return { success: true };
  }

  @Patch(':id/status')
  async changeStatusEndpoint(
    @Param('id') id: string,
    @Body('status') status: ChurchStatus,
    @Req() req,
  ) {
    const church = await this.listChurches['churchRepo'].findById(id);
    if (!church) throw new NotFoundException('Church not found');
    assertTenantAccess(req.user, church.tenantId);
    await this.changeStatus.execute(id, status);
    return { success: true };
  }
}
