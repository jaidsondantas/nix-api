import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupportUserDocument = SupportUser & Document;

@Schema({ collection: 'support_users' })
export class SupportUser {
  @Prop({ required: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, match: /.+\@.+\..+/ })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  phone?: string;

  @Prop({ enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Prop({ enum: ['super_admin', 'support'], required: true })
  role: 'super_admin' | 'support';

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop()
  lastLogin?: Date;
}

export const SupportUserSchema = SchemaFactory.createForClass(SupportUser);
