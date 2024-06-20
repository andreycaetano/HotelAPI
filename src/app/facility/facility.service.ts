import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { Prisma } from '@prisma/client';
import { Facility } from './entities/facility.entity';
import { FacilityNotFoundException } from './error/facilityNotFoundException.error';
import { IconBadRequestException } from './error/iconBadRequestException.error';

@Injectable()
export class FacilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly upload: UploadService
  ) {};

  private async uploadIconImage(file: Express.Multer.File): Promise<string> {
    return await this.upload.uploadFile(file, 'facility/icon')
  }

  async create(createFacilityDto: CreateFacilityDto, file: Express.Multer.File): Promise<Facility> {
    if (!file) {
      throw new IconBadRequestException();
    }
    const data: Prisma.FacilitiesCreateInput = {
      ...createFacilityDto,
      icon: await this.uploadIconImage(file)
    }
    const createdFacility = await this.prisma.facilities.create({ data })
    return createdFacility;
  }

  async findAll(): Promise<Facility[]> {
    return await this.prisma.facilities.findMany();
  }

  async findOne(id: string): Promise<Facility> {
    const findFacility = await this.prisma.facilities.findUnique({ where: { id }});
    if (!findFacility) {
      throw new FacilityNotFoundException(id)
    }
    return findFacility;
  }

  async update(id: string, updateFacilityDto: UpdateFacilityDto, file?: Express.Multer.File): Promise<Facility> {
    const findFacility = await this.findOne(id);
    const data: Prisma.FacilitiesUpdateInput = {
      ...updateFacilityDto,
      icon: file && await this.uploadIconImage(file)
    }
    if (file) {
      await this.upload.deleteFile(findFacility.icon)
    }
    const uploadtedFacility = await this.prisma.facilities.update({
      where: { id },
      data
    })
    return uploadtedFacility;
  }

  async remove(id: string): Promise<void> {
    const findFacility = await this.findOne(id);
    const hotelWithFacility = await this.prisma.hotel.findMany({
      where: {
        facilities: {
          some: {
            id: id
          }
        }
      }
    })
    if (hotelWithFacility.length > 0) {
      throw new UnprocessableEntityException(`Cannot delete facility with ID ${id} because it is associated with ${hotelWithFacility.length} hotels.`)
    }
    await this.upload.deleteFile(findFacility.icon);
    await this.prisma.facilities.delete({ where: { id }})
  }
}
