import {
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UserFilterDto {
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsEnum(['admin', 'leader', 'member'])
  role?: 'admin' | 'leader' | 'member';

  @IsOptional()
  @IsMongoId()
  churchId?: string;

  @IsOptional()
  @IsMongoId()
  memberId?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  // Paginação
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  // tenantId só permitido para super_admin/support
  @IsOptional()
  @IsMongoId()
  tenantId?: string;
}
