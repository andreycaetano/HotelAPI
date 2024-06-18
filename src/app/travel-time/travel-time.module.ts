import { Module } from '@nestjs/common';
import { TravelTimeService } from './travel-time.service';
import { TravelTimeController } from './travel-time.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [TravelTimeController],
  providers: [TravelTimeService],
  imports: [
    PrismaModule
  ]
})
export class TravelTimeModule {}
