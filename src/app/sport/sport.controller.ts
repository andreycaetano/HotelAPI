import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SportService } from './sport.service';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('sport')
export class SportController {
  constructor(private readonly sportService: SportService) {}

  @Post()
  create(@Body() createSportDto: CreateSportDto) {
    return this.sportService.create(createSportDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.sportService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sportService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSportDto: UpdateSportDto) {
    return this.sportService.update(id, updateSportDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sportService.remove(id);
  }
}
