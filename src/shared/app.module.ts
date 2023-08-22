import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUri'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*
{
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        uri: configSecret.get('mongoUri')
      })
    }
  */