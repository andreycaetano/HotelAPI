import { Module } from '@nestjs/common';
import { HotelImagesService } from './hotel-images.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { HotelModule } from '../hotel.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  providers: [HotelImagesService],
  imports: [PrismaModule, UploadModule],
  exports: [HotelImagesService]
})
export class HotelImagesModule {}
