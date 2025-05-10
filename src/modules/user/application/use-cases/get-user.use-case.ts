import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;
    return result;
  }
}
