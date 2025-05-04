import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SupportUserRepository } from '../../../support-user/infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class ValidateUserUseCase {
  private readonly userRepo: any;

  constructor(
    // private readonly userRepo: any,
    private readonly supportUserRepo: SupportUserRepository,
  ) {}

  async execute(type: 'user' | 'support', email: string, password: string) {
    const repo = type === 'user' ? this.userRepo : this.supportUserRepo;
    const user = await repo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.status === 'inactive') {
      throw new UnauthorizedException('User is inactive');
    }
    const { passwordHash, ...result } = user;
    return { ...result, role: type === 'user' ? 'user' : user.role };
  }
}
