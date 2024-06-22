import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { Prisma, Slider } from '@prisma/client';

@Injectable()
export class SliderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService
  ) {}
  
  async create(createSliderDto: CreateSliderDto, file: Express.Multer.File): Promise<Slider> {
    const data: Prisma.SliderCreateInput = {
      ...createSliderDto,
      image: await this.upload.uploadFile(file, 'slider')
    }
    const slider = await this.prisma.slider.create({ data });
    return slider;
  }

  async findAll(): Promise<Slider[]> {
    return await this.prisma.slider.findMany();
  }

  async findOne(id: string): Promise<Slider> {
    const slider = await this.prisma.slider.findUnique({ where: { id }});
    if (!slider) {
      throw new NotFoundException(`Slider with ID ${id} not found`)
    }
    return slider;
  }

  async update(id: string, updateSliderDto?: UpdateSliderDto, file?: Express.Multer.File) {
    const slider =  await this.findOne(id);
    const data: Prisma.SliderUpdateInput = {};

    if (updateSliderDto) {
      if (updateSliderDto.author !== undefined) data.author = updateSliderDto.author;
      if (updateSliderDto.comment !== undefined) data.comment = updateSliderDto.comment;
      if (updateSliderDto.information !== undefined) data.information = updateSliderDto.information;
      if (updateSliderDto.title !== undefined) data.title = updateSliderDto.title;
    }

    if (file) {
      if (slider.image) {
        await this.upload.deleteFile(slider.image)
      }
      data.image = await this.upload.uploadFile(file, `slider`);
    }

    const updatedSlider = await this.prisma.slider.update({
      where: { id },
      data
    })
    return updatedSlider;
  }

  async remove(id: string): Promise<void> {
    const slider = await this.findOne(id);
    await this.upload.deleteFile(slider.image);
    await this.prisma.slider.delete({ where: { id }})
  }
}
