import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';
import { UpdateMemberDto } from '../dto/update-member.dto';

@Injectable()
export class UpdateMemberUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(id: string, dto: UpdateMemberDto) {
    if ('createdAt' in dto) {
      throw new BadRequestException({
        message: 'createdAt cannot be updated.',
      });
    }
    if (dto.email) {
      const exists = await this.memberRepo.find(
        { _id: { $ne: id }, churchId: dto.churchId, email: dto.email },
        { skip: 0, limit: 1 },
      );
      if (exists.length > 0)
        throw new BadRequestException({
          message: 'Email already exists for this church.',
        });
    }
    const updated = await this.memberRepo.update(id, dto);
    if (!updated) throw new NotFoundException({ message: 'Member not found.' });
    return updated;
  }
}
