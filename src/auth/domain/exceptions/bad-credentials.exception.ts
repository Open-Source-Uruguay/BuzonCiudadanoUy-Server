import { ConflictException } from '@nestjs/common';

export class BadCredentialsException extends ConflictException {
  constructor() {
    super('Las credenciales ingresadas son incorrectas');
  }
}