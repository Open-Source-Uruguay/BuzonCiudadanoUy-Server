import { Global, Module } from '@nestjs/common';
import { UserController } from './infraestructure/adapters/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UserRepository } from './infraestructure/ports/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './domain/entities/user.entity';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, CreateUserUseCase]
})
export class UserModule {}
