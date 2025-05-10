import { IsOptional, IsMongoId } from 'class-validator';

export class PatchUserMemberDto {
  @IsOptional()
  @IsMongoId()
  memberId?: string | null;
}
