import { Injectable } from '@nestjs/common';
import { BadCredentialsException } from 'src/auth/domain/exceptions/bad-credentials.exception';
import { AuthenticateDto } from 'src/auth/infraestructure/adapters/dtos/authenticate.dto';
import { UserRepository } from 'src/user/infraestructure/ports/user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenStrategy } from 'src/auth/infraestructure/adapters/strategies/refresh-token.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    readonly configService: ConfigService
  ) { }

  async execute(auth: AuthenticateDto): Promise<any> {
    const user = await this.userRepository.findUserByEmail(auth.email);

    if (!user) {
      throw new BadCredentialsException();
    }

    const match = await bcrypt.compare(auth.password, user.password);

    if (!match) {
      throw new BadCredentialsException();
    }

    return match;
  }
}