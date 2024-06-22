import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { UploadModule } from 'src/upload/upload.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [UploadModule, PrismaModule]
})
export class TeamModule {}
