// application/use-cases/delete-member.use-case.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';

@Injectable()
export class DeleteMemberUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(id: string) {
    const member = await this.memberRepo.softDelete(id);
    if (!member) throw new NotFoundException({ message: 'Member not found.' });
    return member;
  }
}
