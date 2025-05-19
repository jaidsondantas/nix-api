import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';

@Injectable()
export class GetMemberUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(id: string) {
    const member = await this.memberRepo.findById(id);
    if (!member) throw new NotFoundException({ message: 'Member not found.' });
    return member;
  }
}
