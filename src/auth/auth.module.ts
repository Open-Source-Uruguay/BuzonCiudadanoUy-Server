import { Module } from '@nestjs/common';
import { AuthController } from './infraestructure/adapters/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './domain/entities/auth.entity';
import { UserRepository } from 'src/user/infraestructure/ports/user.repository';
import { AuthenticateUseCase } from './application/usecases/authenticate.usecase';
import { UserSchema } from 'src/user/domain/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema },
      { name: 'User', schema: UserSchema }
    ]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get('secretKey'),
        publicKey: configService.get('secretPub'),
        signOptions: { expiresIn: '60s', algorithm: 'RS256' }
      })
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    AuthenticateUseCase
  ]
})
export class AuthModule {}
