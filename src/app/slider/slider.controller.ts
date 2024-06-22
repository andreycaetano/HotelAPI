import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SliderService } from './slider.service';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('slider')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('slider'))
  create(@Body() createSliderDto: CreateSliderDto, @UploadedFile() file: Express.Multer.File) {
    return this.sliderService.create(createSliderDto, file);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('slider'))
  update(@Param('id') id: string, @Body() updateSliderDto: UpdateSliderDto, file: Express.Multer.File) {
    return this.sliderService.update(id, updateSliderDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(id);
  }
}
