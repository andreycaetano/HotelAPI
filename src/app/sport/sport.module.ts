import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [SportController],
  providers: [SportService],
  imports: [
    PrismaModule
  ]
})
export class SportModule {}
