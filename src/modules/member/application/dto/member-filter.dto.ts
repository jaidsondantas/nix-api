import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MemberFilterDto {
  @IsOptional() @IsMongoId() churchId?: string;
  @IsOptional() @IsEnum(['active', 'inactive']) status?: string;
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsString() group?: string;
  @IsOptional() @IsString() communityRole?: string;
  @IsOptional()
  @IsEnum(['male', 'female', 'other', 'preferNotToSay'])
  gender?: string;
  @IsOptional() @IsMongoId() tenantId?: string;

  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) limit?: number = 20;
}
