import { IsString, IsIn } from 'class-validator';

export class PatchDepartmentStatusDto {
  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;
}
