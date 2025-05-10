import { IsEnum } from 'class-validator';

export class PatchUserStatusDto {
  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';
}
