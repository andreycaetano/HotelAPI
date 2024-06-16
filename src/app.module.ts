import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AccountModule } from './app/account/account.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwtAuth.guard';
import { ErrorMiddleware } from './common/middlewares/error.middleware';
import { LoggerModule } from './common/logger/logger.module';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';


@Module({
  imports: [PrismaModule, AccountModule, AuthModule, LoggerModule, LoggerModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorMiddleware)
      .forRoutes({path: '*', method: RequestMethod.ALL });
  }
}

