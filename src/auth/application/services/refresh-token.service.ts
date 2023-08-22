// refresh-token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateRefreshToken(user: any) {
    const refreshToken = this.jwtService.sign({ user }, { expiresIn: '7d' });

    return refreshToken;
  }
}
