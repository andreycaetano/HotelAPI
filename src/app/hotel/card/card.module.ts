import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  providers: [CardService],
  imports: [PrismaModule],
  exports: [CardService]
})
export class CardModule {}
