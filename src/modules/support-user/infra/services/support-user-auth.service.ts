import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SupportUserRepository } from '../database/mongoose/repositories/support-user-repository';

@Injectable()
export class SupportUserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly supportUserRepo: SupportUserRepository,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.supportUserRepo.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
