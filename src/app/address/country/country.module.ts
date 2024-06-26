import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [
    CountryService
  ]
})
export class CountryModule {}
