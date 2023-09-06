import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: "El nombre no puede estar vacio" })
  @IsString({ message: "Por favor ingresa un nómbre válido" })
  name: string;

  @IsNotEmpty({ message: "El correo no puede estar vacio" })
  @IsEmail({}, { message: "Por favor ingrese un correo válido" })
  email: string;

  @IsNotEmpty({ message: "La contraseña no puede estar vacia" })
  @MinLength(5,{message: "La contraseña es muy corta"})
  password: string;
}
