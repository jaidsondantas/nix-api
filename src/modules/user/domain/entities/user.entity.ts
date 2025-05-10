import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class User extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  tenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  churchId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Member' })
  memberId?: Types.ObjectId;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop()
  phone?: string;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ required: true, enum: ['admin', 'leader', 'member'] })
  role: string;

  @Prop()
  lastLogin?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
