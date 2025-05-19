import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';
import { UserFilterDto } from '../dto/user-filter.dto';
import { Types } from 'mongoose';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(filters: UserFilterDto, isSuperOrSupport: boolean) {
    const { page = 1, limit = 20, ...rest } = filters;
    const skip = (page - 1) * limit;

    // Monta filtro MongoDB
    const mongoFilter: any = {};
    if (rest.status) mongoFilter.status = rest.status;
    if (rest.role) mongoFilter.role = rest.role;
    if (rest.churchId) mongoFilter.churchId = rest.churchId;
    if (rest.memberId) mongoFilter.memberId = rest.memberId;
    if (rest.name) mongoFilter.name = { $regex: rest.name, $options: 'i' };
    if (rest.email) mongoFilter.email = rest.email;

    // tenantId só se for super/support, senão sempre do contexto
    if (isSuperOrSupport && rest.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(rest.tenantId);
    } else if (!isSuperOrSupport && filters.tenantId) {
      mongoFilter.tenantId = new Types.ObjectId(filters.tenantId);
    }

    const [users, total] = await Promise.all([
      this.userRepo.findWithPagination(mongoFilter, skip, limit),
      this.userRepo.count(mongoFilter),
    ]);

    return {
      data: users.map(({ passwordHash, ...rest }) => rest),
      meta: {
        page,
        limit,
        total,
        hasNextPage: page * limit < total,
      },
    };
  }
}
