import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { UploadModule } from 'src/upload/upload.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [UploadModule, PrismaModule]
})
export class NewsModule {}
