import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ collection: 'tenants' })
export class Tenant {
  @Prop({ required: true, minlength: 3, maxlength: 120 })
  corporateName: string;

  @Prop({ required: true, unique: true })
  document: string;

  @Prop()
  logoUrl?: string;

  @Prop({ required: true })
  mainContact: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Prop({ enum: ['free', 'pro', 'enterprise'], default: 'free' })
  subscriptionPlan: 'free' | 'pro' | 'enterprise';

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
