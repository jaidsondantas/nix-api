import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class MemberDocument extends Document {
  @Prop({ type: Types.ObjectId })
  churchId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, minlength: 3, maxlength: 120 })
  fullName: string;

  @Prop()
  socialName?: string;

  @Prop({ enum: ['male', 'female', 'other', 'preferNotToSay'] })
  gender?: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  cpf?: string;

  @Prop({ enum: ['single', 'married', 'widowed', 'divorced'] })
  maritalStatus?: string;

  @Prop()
  baptismDate?: Date;

  @Prop()
  memberSince?: Date;

  @Prop({ required: true, enum: ['active', 'inactive'] })
  status: string;

  @Prop()
  notes?: string;

  @Prop({
    type: {
      street: String,
      number: String,
      district: String,
      city: String,
      state: String,
      zipCode: String,
      complement: String,
    },
  })
  address?: Record<string, any>;

  @Prop()
  group?: string;

  @Prop()
  communityRole?: string;
}

export const MemberSchema = SchemaFactory.createForClass(MemberDocument);
MemberSchema.index({ churchId: 1, email: 1 }, { unique: true, sparse: true });
