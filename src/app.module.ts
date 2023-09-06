import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CurrentUserMiddleware } from './common/middlewares/current-user.middleware';
import { RefreshUserMiddleware } from './common/middlewares/refresh-user.middeware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(RefreshUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
