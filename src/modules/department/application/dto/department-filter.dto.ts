import { IsOptional, IsString, IsMongoId, IsIn } from 'class-validator';

export class DepartmentFilterDto {
  @IsOptional() @IsMongoId() tenantId?: string;

  @IsOptional()
  @IsMongoId()
  churchId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsIn(['department', 'ministry', 'group', 'class'])
  type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
