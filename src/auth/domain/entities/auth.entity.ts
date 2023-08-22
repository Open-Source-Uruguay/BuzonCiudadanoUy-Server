import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/user/domain/entities/user.entity';

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({ type: User })
  user: User;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);