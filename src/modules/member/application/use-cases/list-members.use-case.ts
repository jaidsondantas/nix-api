// src/modules/member/application/use-cases/list-members.use-case.ts
import { Injectable } from '@nestjs/common';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';
import { MemberFilterDto } from '../dto/member-filter.dto';
import { Types } from 'mongoose';

@Injectable()
export class ListMembersUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(filters: MemberFilterDto, isSuperOrSupport: boolean) {
    const { page = 1, limit = 20, ...rest } = filters;
    const skip = (page - 1) * limit;

    // Monta filtro MongoDB
    const mongoFilter: any = {};
    if (rest.status) mongoFilter.status = rest.status;
    if (rest.gender) mongoFilter.gender = rest.gender;
    if (rest.churchId) mongoFilter.churchId = new Types.ObjectId(rest.churchId);
    if (rest.fullName)
      mongoFilter.fullName = { $regex: rest.fullName, $options: 'i' };
    if (rest.group) mongoFilter.group = rest.group;
    if (rest.communityRole) mongoFilter.communityRole = rest.communityRole;

    // tenantId só se for super/support, senão sempre do contexto
    if (isSuperOrSupport && rest.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(rest.tenantId);
    } else if (!isSuperOrSupport && filters.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(filters.tenantId);
    }

    const [members, total] = await Promise.all([
      this.memberRepo.find(mongoFilter, { skip, limit }),
      this.memberRepo.count(mongoFilter),
    ]);

    return {
      data: members,
      meta: {
        page,
        limit,
        total,
        hasNextPage: page * limit < total,
      },
    };
  }
}
