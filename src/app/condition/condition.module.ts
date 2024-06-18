import { Module } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { ConditionController } from './condition.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [ConditionController],
  providers: [ConditionService],
  imports: [
    PrismaModule
  ]
})
export class ConditionModule {}
