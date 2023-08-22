import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('Ya existe una cuenta con este correo electrónico');
  }
}