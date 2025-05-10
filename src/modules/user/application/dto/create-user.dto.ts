import { IsMongoId, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsEnum, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsMongoId()
  tenantId: string;

  @IsOptional()
  @IsMongoId()
  churchId?: string;

  @IsOptional()
  @IsMongoId()
  memberId?: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  passwordHash: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(['active', 'inactive'])
  status: 'active' | 'inactive';

  @IsIn(['admin', 'leader', 'member'])
  role: string;
}
