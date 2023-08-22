import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthenticateDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}