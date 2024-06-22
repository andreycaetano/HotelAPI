import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('banner'))
  create(@Body() createNewsDto: CreateNewsDto, @UploadedFile() file: Express.Multer.File) {
    return this.newsService.create(createNewsDto, file);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('banner'))
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto, @UploadedFile() file: Express.Multer.File) {
    return this.newsService.update(id, updateNewsDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
