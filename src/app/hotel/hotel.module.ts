import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { UploadModule } from 'src/upload/upload.module';
import { CardModule } from './card/card.module';
import { DescriptionModule } from './description/description.module';
import { HotelImagesModule } from './hotel-images/hotel-images.module';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService],
  imports: [HotelImagesModule, CardModule, DescriptionModule, PrismaModule, UploadModule],
})
export class HotelModule {}
