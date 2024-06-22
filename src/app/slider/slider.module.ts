import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { UploadModule } from 'src/upload/upload.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [SliderController],
  providers: [SliderService],
  imports: [UploadModule, PrismaModule]
})
export class SliderModule {}
