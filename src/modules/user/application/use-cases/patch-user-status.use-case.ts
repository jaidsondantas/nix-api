import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';
import { PatchUserStatusDto } from '../dto/patch-user-status.dto';

@Injectable()
export class PatchUserStatusUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, dto: PatchUserStatusDto) {
    const user = await this.userRepo.updateStatus(id, dto.status);
    if (!user) throw new NotFoundException('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user.toObject();
    return result;
  }
}
