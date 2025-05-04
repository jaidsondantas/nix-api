import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class ChangeSupportUserPasswordUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(id: string, new_password: string) {
    const user = await this.repo.findById(id);
    if (!user)
      throw new NotFoundException({ message: 'SupportUser not found' });
    const password_hash = await bcrypt.hash(new_password, 10);
    await this.repo.update(id, { passwordHash: password_hash });
    return { message: 'Password updated successfully' };
  }
}
