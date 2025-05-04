import { Injectable } from '@nestjs/common';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';

@Injectable()
export class ListSupportUsersUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute() {
    const users = await this.repo.findAll();
    return users.map(({ passwordHash, ...rest }) => rest);
  }
}
