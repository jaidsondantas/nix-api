import { IsEmail, IsString, MinLength, MaxLength, IsOptional, Matches, IsIn } from 'class-validator';

export class CreateSupportUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @Matches(/^(\+\d{1,3}[- ]?)?\d{10,15}$/)
  phone?: string;

  @IsIn(['super_admin', 'support'])
  role: 'super_admin' | 'support';
}
