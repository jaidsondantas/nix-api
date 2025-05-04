import {
  IsString,
  IsOptional,
  IsIn,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @Length(3, 120)
  corporateName: string;

  @IsString()
  document: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsString()
  @Matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\+\d{1,3}\s?\d{4,14}(?:x.+)?))$/,
    {
      message: 'mainContact must be a valid email or phone',
    },
  )
  mainContact: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';

  @IsOptional()
  @IsIn(['free', 'pro', 'enterprise'])
  subscriptionPlan?: 'free' | 'pro' | 'enterprise';
}
