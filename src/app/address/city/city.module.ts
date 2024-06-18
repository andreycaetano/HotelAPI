import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CountryService } from '../country/country.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [
    CountryModule,
    PrismaModule
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
