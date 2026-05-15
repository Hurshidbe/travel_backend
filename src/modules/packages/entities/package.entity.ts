import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Package {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  destination!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true, default : "" })
  image!: string;

  @Prop({ default: [] })
  gallery!: string[];

  @Prop({ default: [] })
  features!: string[];

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
