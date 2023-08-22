import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/infraestructure/adapters/dtos/create-user.dto';
import { CreateUserUseCase } from '../usecases/create-user.usecase';

@Injectable()
export class UserService {
  constructor(private readonly createUser: CreateUserUseCase) { }

  signup(user: CreateUserDto) {
    return this.createUser.execute(user);
  }
}

