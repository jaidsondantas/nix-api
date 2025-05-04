import { IsEmail, IsString, IsIn } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsIn(['user', 'support'])
  type: 'user' | 'support';
}
