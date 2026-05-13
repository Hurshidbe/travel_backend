import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { user_role } from 'src/shared/enums';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ enum: user_role, default: user_role.ADMIN })
  role!: user_role;

  @Prop({ default: ['packages', 'bookings'] })
  permissions!: string[];

  @Prop({ required: true })
  password!: string;

  @Prop({ _id: true })
  _id!: Types.ObjectId;

  async matchPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
