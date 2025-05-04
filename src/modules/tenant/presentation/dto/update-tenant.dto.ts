import { CreateTenantDto } from './create-tenant.dto';
import { IsOptional } from 'class-validator';

export class UpdateTenantDto implements Partial<CreateTenantDto> {
  @IsOptional()
  corporateName?: string;

  @IsOptional()
  document?: string;

  @IsOptional()
  logoUrl?: string;

  @IsOptional()
  mainContact?: string;

  @IsOptional()
  status?: 'active' | 'inactive';

  @IsOptional()
  subscriptionPlan?: 'free' | 'pro' | 'enterprise';
}
