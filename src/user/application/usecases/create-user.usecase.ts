import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/infraestructure/ports/user.repository';
import { CreateUserDto } from 'src/user/infraestructure/adapters/dtos/create-user.dto';
import { UserAlreadyExistsException } from 'src/user/domain/exceptions/user-already-exists.exception';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: CreateUserDto): Promise<any> {
    const userExists = await this.userRepository.findUserByEmail(user.email);

    if (userExists) {
      throw new UserAlreadyExistsException();
    }

    return this.userRepository.create(user);
  }
}
