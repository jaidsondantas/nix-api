import { Injectable, NotFoundException } from '@nestjs/common';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class DeleteSupportUserUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(id: string) {
    const user = await this.repo.findById(id);
    if (!user)
      throw new NotFoundException({ message: 'SupportUser not found' });
    await this.repo.delete(id);
    return { message: 'SupportUser deleted successfully' };
  }
}
