import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty({ message: "El correo no puede estar vacio" })
  @IsEmail({}, { message: "Por favor ingrese un correo válido" })
  email: string;

  @IsNotEmpty({ message: "La contraseña no puede estar vacia" })
  password: string;
}
