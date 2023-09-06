import { Allow } from "class-validator";

export class UpdateUserDto {
  @Allow()
  name: string;

  @Allow()
  email: string;

  @Allow()
  password: string;
}
