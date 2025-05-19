// src/modules/member/application/dto/patch-member-status.dto.ts
import { IsEnum } from 'class-validator';

export class PatchMemberStatusDto {
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}
