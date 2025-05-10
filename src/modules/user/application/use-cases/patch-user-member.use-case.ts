import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';
import { PatchUserMemberDto } from '../dto/patch-user-member.dto';
import { Types } from 'mongoose';

@Injectable()
export class PatchUserMemberUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, dto: PatchUserMemberDto) {
    const memberId = dto.memberId ? new Types.ObjectId(dto.memberId) : null;
    const user = await this.userRepo.updateMember(id, memberId);
    if (!user) throw new NotFoundException('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user.toObject();
    return result;
  }
}
