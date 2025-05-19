import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, authUser: any, isSuperOrSupport: boolean) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    // Restrinja acesso a outros tenants
    if (!isSuperOrSupport && user.tenantId.toString() !== authUser.tenantId) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash, ...result } = user;
    return result;
  }
}
