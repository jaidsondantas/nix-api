import { IsOptional, IsString, MinLength, MaxLength, IsEmail, Matches, IsIn } from 'class-validator';

export class UpdateSupportUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10,15}$/)
  phone?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsIn(['super_admin', 'support'])
  role?: 'super_admin' | 'support';
}
