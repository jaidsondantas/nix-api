import { IsIn, IsMongoId, IsOptional, IsString, Length } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsMongoId()
  tenantId?: string;

  @IsOptional()
  @IsMongoId()
  churchId?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['department', 'ministry', 'group', 'class'])
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  @IsMongoId()
  leaderId?: string;
}
