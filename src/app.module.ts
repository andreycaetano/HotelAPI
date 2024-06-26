import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AccountModule } from './app/account/account.module';
import { CityModule } from './app/address/city/city.module';
import { CountryModule } from './app/address/country/country.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtAuthGuard } from './app/auth/guards/jwtAuth.guard';
import { ConditionModule } from './app/condition/condition.module';
import { FacilityModule } from './app/facility/facility.module';
import { GaleryModule } from './app/galery/galery.module';
import { HotelModule } from './app/hotel/hotel.module';
import { MailchimpModule } from './app/mailchimp/mailchimp.module';
import { NewsModule } from './app/news/news.module';
import { RatingModule } from './app/rating/rating.module';
import { SportModule } from './app/sport/sport.module';
import { TravelTimeModule } from './app/travel-time/travel-time.module';
import { AllExceptionsFilter } from './common/filters/allExceptions.filter';
import { ValidationExceptionFilter } from './common/filters/validationException.filter';
import { LoggerModule } from './common/logger/logger.module';
import { CustomLoggerService } from './common/logger/logger.service';
import { ErrorMiddleware } from './common/middlewares/error.middleware';
import { PrismaModule } from './database/prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { SliderModule } from './app/slider/slider.module';
import { TeamModule } from './app/team/team.module';

@Module({
  imports: [
    PrismaModule,
    AccountModule,
    AuthModule,
    LoggerModule,
    LoggerModule,
    CountryModule,
    CityModule,
    TravelTimeModule,
    SportModule,
    RatingModule,
    ConditionModule,
    UploadModule,
    FacilityModule,
    HotelModule,
    MailchimpModule,
    GaleryModule,
    NewsModule,
    SliderModule,
    TeamModule,
  ],
  controllers: [],
  providers: [
    CustomLoggerService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter
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