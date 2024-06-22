import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @UseInterceptors(FileInterceptor('team'))
  create(@Body() createTeamDto: CreateTeamDto, @UploadedFile() file: Express.Multer.File) {
    return this.teamService.create(createTeamDto, file);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('team'))
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto, @UploadedFile() file: Express.Multer.File) {
    return this.teamService.update(id, updateTeamDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
