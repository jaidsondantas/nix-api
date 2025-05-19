import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsDateString,
  Length,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString() street: string;
  @IsString() number: string;
  @IsString() district: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() zipCode: string;
  @IsOptional() @IsString() complement?: string;
}

export class CreateMemberDto {
  @IsMongoId()
  churchId: string;

  @IsMongoId()
  tenantId: string;

  @IsString()
  @Length(3, 120)
  fullName: string;

  @IsOptional() @IsString() socialName?: string;
  @IsOptional()
  @IsEnum(['male', 'female', 'other', 'preferNotToSay'])
  gender?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsDateString() birthDate?: Date;
  @IsOptional() @IsString() cpf?: string;
  @IsOptional()
  @IsEnum(['single', 'married', 'widowed', 'divorced'])
  maritalStatus?: string;
  @IsOptional() @IsDateString() baptismDate?: Date;
  @IsOptional() @IsDateString() memberSince?: Date;
  @IsString() @IsEnum(['active', 'inactive']) status: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @ValidateNested() @Type(() => AddressDto) address?: AddressDto;
  @IsOptional() @IsString() group?: string;
  @IsOptional() @IsString() communityRole?: string;
}
