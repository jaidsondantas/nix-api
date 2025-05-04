import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { SupportUserRepository } from '../../infra/database/mongoose/repositories/support-user-repository';
import { UpdateSupportUserDto } from '../../presentation/dto/update-support-user.dto';
import { SupportUserDocument } from '../../infra/database/mongoose/schemas/support-user.schema';

@Injectable()
export class UpdateSupportUserUseCase {
  constructor(private readonly repo: SupportUserRepository) {}

  async execute(id: string, dto: UpdateSupportUserDto) {
    if (dto.email) {
      const existing = (await this.repo.findByEmail(
        dto.email,
      )) as SupportUserDocument | null;
      if (existing && existing._id.toString() !== id) {
        throw new ConflictException({ message: 'Email already exists' });
      }
    }
    const updated = await this.repo.update(id, dto);
    if (!updated)
      throw new NotFoundException({ message: 'SupportUser not found' });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...result } = updated;
    return result;
  }
}
