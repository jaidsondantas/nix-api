// src/modules/member/member.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MemberSchema } from './infra/database/mongoose/schemas/member.schema';
import { MemberRepository } from './infra/database/mongoose/repositories/member.repository';

import { CreateMemberUseCase } from './application/use-cases/create-member.use-case';
import { UpdateMemberUseCase } from './application/use-cases/update-member.use-case';
import { GetMemberUseCase } from './application/use-cases/get-member.use-case';
import { ListMembersUseCase } from './application/use-cases/list-members.use-case';
import { DeleteMemberUseCase } from './application/use-cases/delete-member.use-case';
import { PatchMemberStatusUseCase } from './application/use-cases/patch-member-status.use-case';

import { MemberController } from './presentation/controllers/member.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Member', schema: MemberSchema }]),
  ],
  controllers: [MemberController],
  providers: [
    MemberRepository,
    CreateMemberUseCase,
    UpdateMemberUseCase,
    GetMemberUseCase,
    ListMembersUseCase,
    DeleteMemberUseCase,
    PatchMemberStatusUseCase,
  ],
  exports: [
    MemberRepository,
    CreateMemberUseCase,
    UpdateMemberUseCase,
    GetMemberUseCase,
    ListMembersUseCase,
    DeleteMemberUseCase,
    PatchMemberStatusUseCase,
  ],
})
export class MemberModule {}
