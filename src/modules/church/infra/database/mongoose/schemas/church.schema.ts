import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ChurchStatus } from '../../../../../../shared/enums/church-status.enum';
import { ChurchType } from '../../../../../../shared/enums/church-type.enum';

export type ChurchDocument = Church & Document;

@Schema({ collection: 'churches' })
export class Address {
  @Prop({ required: true }) street: string;
  @Prop({ required: true }) number: string;
  @Prop({ required: true }) district: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) state: string;
  @Prop({ required: true }) zipCode: string;
  @Prop() complement?: string;
}

@Schema({
  collection: 'churches',
  toJSON: { virtuals: true, versionKey: false },
})
export class Church {
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId: Types.ObjectId;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  name: string;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true, minlength: 3, maxlength: 100 })
  localManager: string;

  @Prop() logoUrl?: string;

  @Prop({
    type: String,
    enum: ChurchStatus,
    default: ChurchStatus.ACTIVE,
    required: true,
  })
  status: ChurchStatus;

  @Prop({ enum: ChurchType })
  type?: ChurchType;

  @Prop({ default: Date.now, immutable: true })
  createdAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
export const ChurchSchema = SchemaFactory.createForClass(Church);

ChurchSchema.index({ tenantId: 1, name: 1 }, { unique: true });
