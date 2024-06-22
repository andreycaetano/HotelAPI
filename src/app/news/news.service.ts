import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { UploadService } from 'src/upload/upload.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
constructor(
  private readonly upload: UploadService,
  private readonly prisma: PrismaService
) {};

  async create(createNewsDto: CreateNewsDto, file: Express.Multer.File) {
    const data: Prisma.NewsCreateInput = {
      ...createNewsDto,
      banner: await this.upload.uploadFile(file, 'news')
    }

    const news = await this.prisma.news.create({ data });
    return news;
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id }});

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`)
    }
    return news;
  }

  async update(id: string, updateNewsDto?: UpdateNewsDto, file?: Express.Multer.File) {
    const news = await this.findOne(id)
    const data: Prisma.NewsUpdateInput = {}
    if(updateNewsDto) {
      if (updateNewsDto.title !== undefined) data.title = updateNewsDto.title
      if (updateNewsDto.description !== undefined) data.description = updateNewsDto.description
      if (updateNewsDto.content !== undefined) data.content = updateNewsDto.content
    }
    if (file) {
      if (news.banner) {
        await this.upload.deleteFile(news.banner)
      }
      data.banner = await this.upload.uploadFile(file, `news`)
    }
    const updatedNews = await this.prisma.news.update({
      where: { id },
      data
    })
    return updatedNews;
  }

  async remove(id: string) {
    const news = await this.findOne(id)
    await this.upload.deleteFile(news.banner)
    await this.prisma.news.delete({ where: { id }})
  }
}
