import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'departments',
  timestamps: { createdAt: 'createdAt', updatedAt: false },
})
export class DepartmentDocument extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Church', required: true, index: true })
  churchId: Types.ObjectId;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ required: true, enum: ['department', 'ministry', 'group', 'class'] })
  type: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Member' })
  leaderId?: Types.ObjectId;

  @Prop({ default: Date.now, immutable: true })
  createdAt: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(DepartmentDocument);
DepartmentSchema.index({ churchId: 1, name: 1 }, { unique: true });
