// src/modules/member/application/dto/update-member.dto.ts
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
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

export class UpdateMemberDto {
  @IsOptional() @IsMongoId() churchId?: string;
  @IsOptional() @IsString() @Length(3, 120) fullName?: string;
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
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @ValidateNested() @Type(() => AddressDto) address?: AddressDto;
  @IsOptional() @IsString() group?: string;
  @IsOptional() @IsString() communityRole?: string;
}
