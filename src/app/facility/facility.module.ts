import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { UploadModule } from 'src/upload/upload.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [FacilityController],
  providers: [FacilityService],
  imports: [UploadModule, PrismaModule]
})
export class FacilityModule {}
