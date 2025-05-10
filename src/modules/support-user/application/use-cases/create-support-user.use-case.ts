import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { CreateSupportUserDto } from '../dto/create-support-user.dto';
import * as bcrypt from 'bcrypt';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class CreateSupportUserUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(dto: CreateSupportUserDto) {
    if (await this.repo.findByEmail(dto.email)) {
      throw new ConflictException({ message: 'Email already exists' });
    }
    const password_hash = await bcrypt.hash(dto.password, 10);
    const user = await this.repo.create({
      ...dto,
      passwordHash: password_hash,
      status: 'active',
      created_at: new Date(),
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash: _, ...result } = user;
    return result;
  }
}
