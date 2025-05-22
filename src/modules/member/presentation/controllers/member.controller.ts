// src/modules/member/presentation/controllers/member.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { CreateMemberDto } from '../../application/dto/create-member.dto';
import { UpdateMemberDto } from '../../application/dto/update-member.dto';
import { PatchMemberStatusDto } from '../../application/dto/patch-member-status.dto';
import { MemberFilterDto } from '../../application/dto/member-filter.dto';
import { CreateMemberUseCase } from '../../application/use-cases/create-member.use-case';
import { UpdateMemberUseCase } from '../../application/use-cases/update-member.use-case';
import { GetMemberUseCase } from '../../application/use-cases/get-member.use-case';
import { ListMembersUseCase } from '../../application/use-cases/list-members.use-case';
import { DeleteMemberUseCase } from '../../application/use-cases/delete-member.use-case';
import { PatchMemberStatusUseCase } from '../../application/use-cases/patch-member-status.use-case';
import { JwtAuthGuard } from '../../../auth/presentation/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../auth/presentation/decorators/roles.decorator';

@Controller('members')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MemberController {
  constructor(
    private readonly createMemberUC: CreateMemberUseCase,
    private readonly updateMemberUC: UpdateMemberUseCase,
    private readonly getMemberUC: GetMemberUseCase,
    private readonly listMembersUC: ListMembersUseCase,
    private readonly deleteMemberUC: DeleteMemberUseCase,
    private readonly patchMemberStatusUC: PatchMemberStatusUseCase,
  ) {}

  @Post()
  @Roles('support', 'super_admin', 'admin', 'leader')
  async create(@Body() dto: CreateMemberDto, @Req() req: any) {
    dto.tenantId = req.user.tenantId;
    return this.createMemberUC.execute(dto);
  }

  @Get()
  @Roles('support', 'super_admin', 'admin', 'leader')
  async list(@Query() query: MemberFilterDto, @Req() req: any) {
    const user = req.user;
    const isSuperOrSupport = ['support', 'super_admin'].includes(user.role);

    if (!isSuperOrSupport) {
      query.tenantId = user.tenantId;
      if (user.role === 'leader') {
        query.churchId = user.churchId;
      }
    }
    return this.listMembersUC.execute(query, isSuperOrSupport);
  }

  @Get(':id')
  @Roles('support', 'super_admin', 'admin', 'leader', 'member')
  async get(@Param('id') id: string, @Req() req: any) {
    const user = req.user;
    const isSuperOrSupport = ['support', 'super_admin'].includes(user.role);
    const isAdmin = user.role === 'admin';
    const isLeader = user.role === 'leader';
    const isMember = user.role === 'member';

    const member = await this.getMemberUC.execute(id);

    if (!isSuperOrSupport) {
      if (isAdmin) {
        // Admin: valida apenas tenantId
        if (
          member.tenantId &&
          String(member.tenantId) !== String(user.tenantId)
        ) {
          throw new ForbiddenException({
            message: 'Access denied to this member.',
          });
        }
      } else if (isLeader) {
        // Leader: valida tenantId e churchId
        if (
          (member.tenantId &&
            String(member.tenantId) !== String(user.tenantId)) ||
          String(member.churchId) !== String(user.churchId)
        ) {
          throw new ForbiddenException({
            message: 'Access denied to this member.',
          });
        }
      } else if (isMember) {
        // Member: só pode acessar o próprio registro
        if (String(id) !== String(user.memberId)) {
          throw new ForbiddenException({
            message: 'Access denied to this member.',
          });
        }
      }
    }

    return member;
  }

  @Put(':id')
  @Roles('support', 'super_admin', 'admin', 'leader')
  async update(@Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.updateMemberUC.execute(id, dto);
  }

  @Delete(':id')
  @Roles('support', 'super_admin', 'admin', 'leader')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id') id: string) {
    await this.deleteMemberUC.execute(id);
  }

  @Patch(':id/status')
  @Roles('support', 'super_admin', 'admin', 'leader')
  async patchStatus(
    @Param('id') id: string,
    @Body() dto: PatchMemberStatusDto,
  ) {
    return this.patchMemberStatusUC.execute(id, dto);
  }
}
