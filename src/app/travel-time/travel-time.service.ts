import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateTravelTimeDto } from './dto/create-travel-time.dto';
import { UpdateTravelTimeDto } from './dto/update-travel-time.dto';
import { TravelTime } from './entities/travel-time.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { TravelTimeNotFoundException } from './error/travelTimeNotFoundException.error';

@Injectable()
export class TravelTimeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTravelTimeDto: CreateTravelTimeDto): Promise<TravelTime> {
    const data: Prisma.TravelTimeCreateInput = createTravelTimeDto
    const createdTravelTime = await this.prisma.travelTime.create({ data })
    return createdTravelTime;
  }

  async findAll(): Promise<TravelTime[]> {
    return await this.prisma.travelTime.findMany();
  }

  async findOne(id: string): Promise<TravelTime> {
    const find = await this.prisma.travelTime.findUnique({
      where: { id }
    })    
    if (!find) {
      throw new TravelTimeNotFoundException(id);
    }
    return find;
  }

  async update(id: string, updateTravelTimeDto: UpdateTravelTimeDto): Promise<TravelTime> {
    await this.findOne(id)
    const data: Prisma.TravelTimeUpdateInput = updateTravelTimeDto

    const updatedTravelTime = await this.prisma.travelTime.update({
      where: { id },
      data
    });
    return updatedTravelTime
  };

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    const hotelsWithTravelTime = await this.prisma.hotel.findMany({
      where: {
        travelTime: { id: id }
      }
    });
    if (hotelsWithTravelTime.length > 0) {
      throw new UnprocessableEntityException(`Cannot delete travel time with ID ${id} because it is associated with ${hotelsWithTravelTime.length} hotels.`);
    }
    await this.prisma.travelTime.delete({ where: { id }})
  }
}
