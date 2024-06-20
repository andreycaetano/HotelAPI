import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { Galery } from './entities/galery.entity';

@Injectable()
export class GaleryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService
  ) {};

  async create(file: Express.Multer.File): Promise<Galery> {
    if (!file) {
      throw new BadRequestException('Image is required.')
    }

    const createdImage = await this.prisma.galery.create({
      data: {
        path: await this.upload.uploadFile(file, 'galery/photos')
      }
    })

    return createdImage;
  }

  async findAll(): Promise<Galery[]> {
    return await this.prisma.galery.findMany();
  }

  async findOne(id: string): Promise<Galery> {
    const findGalery = await this.prisma.galery.findUnique({ where: { id }});

    if (!findGalery) {
      throw new NotFoundException(`Photo with ID ${id} not found`)
    }
    return findGalery;
  }

  async update(id: string, file: Express.Multer.File): Promise<Galery> {
    const photo = await this.findOne(id);

    if (!file) {
      throw new BadRequestException('Image is required.')
    };

    await this.upload.deleteFile(photo.path)

    const updateGalery = await this.prisma.galery.update({
      where: { id },
      data: {
        path: await this.upload.uploadFile(file, 'galery/photos')
      }
    })

    return updateGalery;
  }

  async remove(id: string): Promise<void> {
    const photo = await this.findOne(id);
    await this.upload.deleteFile(photo.path);
    await this.prisma.galery.delete({ where: { id }})
  }

  async createMovie(file: Express.Multer.File): Promise<Galery> {
    if (!file) {
      throw new BadRequestException('Movie is required.')
    }

    const createdImage = await this.prisma.galery.create({
      data: {
        path: await this.upload.uploadFile(file, 'galery/movie')
      }
    })

    return createdImage;
  }

  async updateMovie(id: string, file: Express.Multer.File): Promise<Galery> {
    const movie = await this.findOne(id);

    if (!file) {
      throw new BadRequestException('Movie is required.')
    };

    await this.upload.deleteFile(movie.path)

    const updateGalery = await this.prisma.galery.update({
      where: { id },
      data: {
        path: await this.upload.uploadFile(file, 'galery/movie')
      }
    })

    return updateGalery;
  }
}
