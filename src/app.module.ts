import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma/prisma.module';
import { AccountModule } from './app/account/account.module';

@Module({
  imports: [PrismaModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
