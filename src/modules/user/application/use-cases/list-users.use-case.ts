import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(filters: any) {
    const users = await this.userRepo.find(filters);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ passwordHash, ...rest }) => rest);
  }
}
