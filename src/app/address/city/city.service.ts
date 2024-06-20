import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CityNotFoundException } from './errors/cityNotFoundException.error';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const data: Prisma.CityCreateInput = {
      name: createCityDto.name,
      country: {
        connect: { id: createCityDto.countryId }
      }
    };
    const createdCity = await this.prisma.city.create({
      data: data,
    });
    return createdCity;
  }

  async findAll(): Promise<City[]> {
    return await this.prisma.city.findMany();
  }

  async findOne(id: string): Promise<City> {
    const findCity = await this.prisma.city.findUnique({ where: { id }});
    if (!findCity) {
      throw new CityNotFoundException(id);
    };
    return findCity;
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    await this.findOne(id)
    const data: Prisma.CityUpdateInput = {
      name: updateCityDto.name
    };
    const updatedCity = await this.prisma.city.update({
      where: { id },
      data: data
    });
    return updatedCity;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    const hotelWithCity = await this.prisma.hotel.findMany({
      where: {
        city: {id: id}
      }
    })
    if (hotelWithCity.length > 0) {
      throw new UnprocessableEntityException(`Cannot delete city with ID ${id} because it is associated with ${hotelWithCity.length} hotels.`)
    }
    await this.prisma.city.delete({ where: { id }})
  }
}
