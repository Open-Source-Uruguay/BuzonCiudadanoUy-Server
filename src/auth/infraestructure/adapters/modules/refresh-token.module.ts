// refresh-token.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get('refreshKey'),
        publicKey: configService.get('refreshPub'),
        signOptions: { expiresIn: '7d', algorithm: 'RS256' } 
      }),
      inject: [ConfigService]
    }),
  ],
  exports: [JwtModule]
})
export class RefreshTokenModule {}
