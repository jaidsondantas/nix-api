import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ChurchStatus } from '../../../../shared/enums/church-status.enum';
import { ChurchType } from '../../../../shared/enums/church-type.enum';

class AddressDto {
  @IsString() @IsNotEmpty() street: string;
  @IsString() @IsNotEmpty() number: string;
  @IsString() @IsNotEmpty() district: string;
  @IsString() @IsNotEmpty() city: string;
  @IsString() @IsNotEmpty() state: string;
  @IsString() @IsNotEmpty() zipCode: string;
  @IsString() @IsOptional() complement?: string;
}

export class CreateChurchDto {
  @IsString() @IsNotEmpty() tenantId: string;
  @IsString() @MinLength(3) @MaxLength(100) name: string;
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\+?\d{1,3}[- ]?)?\d{10,15}$|^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'contact must be a valid email or phone',
  })
  contact: string;
  @IsString() @MinLength(3) @MaxLength(100) localManager: string;
  @IsUrl() @IsOptional() logoUrl?: string;
  @IsIn(['active', 'inactive'])
  @IsOptional()
  status?: ChurchStatus = ChurchStatus.ACTIVE;
  @IsIn(['main', 'branch', 'mission'])
  @IsOptional()
  type?: ChurchType;
}
