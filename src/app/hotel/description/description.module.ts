import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { DescriptionService } from './description.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [CommentModule, PrismaModule, UploadModule],
  providers: [DescriptionService],
  exports: [DescriptionService]
})
export class DescriptionModule {}
