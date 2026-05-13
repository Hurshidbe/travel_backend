import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Log {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user!: Types.ObjectId;

  @Prop({ required: true })
  userName!: string;

  @Prop({ required: true })
  action!: string;

  @Prop()
  target!: string;

  @Prop()
  targetId!: string;

  @Prop({ required: false })
  details?: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
