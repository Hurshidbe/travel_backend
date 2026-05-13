import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Expence {
  @Prop({ required: true }) amount!: number;
  @Prop({ required: true, trim: true }) category!: string;
  @Prop({ required: false }) description?: string;
  @Prop({ default: Date.now(), required: false }) date?: Date;
}

export const ExpenceSchema = SchemaFactory.createForClass(Expence);
