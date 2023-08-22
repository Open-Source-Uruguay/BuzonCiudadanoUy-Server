import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs'; 

export enum Role {
  ADMIN = "Admin",
  MOD = "Mod",
  USER = "User"
}

export const privateFields = [
  "__v",
  "password"
]

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({unique: [true, 'Duplicated email']})
  email: string

  @Prop()
  password: string

  @Prop()
  name: string

  @Prop()
  surname: string

  @Prop()
  avatar: string

  @Prop()
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});