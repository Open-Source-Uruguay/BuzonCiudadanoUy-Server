import { Allow, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Allow()
  name: string;

  @Allow()
  surname: string;

  @Allow()
  avatar: string;

  @Allow()
  role: string;
}