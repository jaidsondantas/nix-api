import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../infra/database/mongoose/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, dto: UpdateUserDto) {
    // Prevent forbidden fields
    delete dto.passwordHash;
    delete dto.createdAt;
    delete dto.lastLogin;

    const data: any = {
      ...dto,
    };

    const user = await this.userRepo.update(id, data);
    if (!user) throw new NotFoundException('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = user.toObject();
    return result;
  }
}
