import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../dto/create-member.dto';
import { MemberRepository } from '../../infra/database/mongoose/repositories/member.repository';
import { Types } from 'mongoose';

@Injectable()
export class CreateMemberUseCase {
  constructor(private readonly memberRepo: MemberRepository) {}

  async execute(dto: CreateMemberDto) {
    if (dto.email) {
      const exists = await this.memberRepo.find(
        { churchId: dto.churchId, email: dto.email, status: 'active' },
        { skip: 0, limit: 1 },
      );
      if (exists.length > 0)
        throw new BadRequestException({
          message: 'Email already exists for this church.',
        });
    }

    let data: any = {
      ...dto,
    };

    if (dto.churchId) {
      data = {
        ...dto,
        churchId: new Types.ObjectId(dto.churchId),
      };
    }

    if (dto.tenantId) {
      data = {
        ...data,
        tenantId: new Types.ObjectId(dto.tenantId),
      };
    }

    return this.memberRepo.create(data);
  }
}
