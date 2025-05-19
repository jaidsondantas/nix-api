// application/use-cases/patch-member-status.use-case.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';
import { PatchMemberStatusDto } from '../dto/patch-member-status.dto';

@Injectable()
export class PatchMemberStatusUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(id: string, dto: PatchMemberStatusDto) {
    if (!['active', 'inactive'].includes(dto.status)) {
      throw new BadRequestException({ message: 'Invalid status value.' });
    }
    const member = await this.memberRepo.updateStatus(id, dto.status);
    if (!member) throw new NotFoundException({ message: 'Member not found.' });
    return member;
  }
}
