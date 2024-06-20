import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  providers: [CommentService],
  imports: [PrismaModule, UploadModule],
  exports: [CommentService]
})
export class CommentModule {}
