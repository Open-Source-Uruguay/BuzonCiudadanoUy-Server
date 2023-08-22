import { Injectable } from '@nestjs/common';
import { AuthenticateUseCase } from '../usecases/authenticate.usecase';
import { AuthenticateDto } from 'src/auth/infraestructure/adapters/dtos/authenticate.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authentication: AuthenticateUseCase) { }
  
  authenticate(auth: AuthenticateDto) {
    return this.authentication.execute(auth);
  }
}
