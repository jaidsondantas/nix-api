import { IsMongoId, IsString, IsOptional, IsIn, Length } from 'class-validator';

export class CreateDepartmentDto {
  @IsMongoId()
  @IsOptional()
  tenantId: string;

  @IsMongoId()
  churchId: string;

  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsIn(['department', 'ministry', 'group', 'class'])
  type: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;

  @IsOptional()
  @IsMongoId()
  leaderId?: string;
}
