import { Injectable, NotFoundException } from '@nestjs/common';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class GetSupportUserUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(id: string) {
    const user = await this.repo.findById(id);
    if (!user)
      throw new NotFoundException({ message: 'SupportUser not found' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user;
    return result;
  }
}
