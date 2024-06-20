import { Module } from '@nestjs/common';
import { GaleryService } from './galery.service';
import { GaleryController } from './galery.controller';
import { UploadModule } from 'src/upload/upload.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [GaleryController],
  providers: [GaleryService],
  imports: [UploadModule, PrismaModule]
})
export class GaleryModule {}
