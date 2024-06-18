import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CountryNotFoundException } from './errors/countryNotFoundException.error';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const data: Prisma.CountryCreateWithoutCitiesInput = createCountryDto
    const createdCountry = await this.prisma.country.create({ data })
    return createdCountry;
  }

  async findAll(): Promise<Country[]> {
     return await this.prisma.country.findMany({ include: { cities: true }})
  }

  async findOne(id: string): Promise<Country> {
    const findCountry = await this.prisma.country.findUnique({
      where: {
        id 
      }, 
      include: {
        cities: true
      }
    });
    if (!findCountry) {
      throw new CountryNotFoundException();
    };
    return findCountry;
  };

  async update(id: string, updateCountryDto: UpdateCountryDto): Promise<Country> {
    const data: Prisma.CountryUpdateWithoutCitiesInput = updateCountryDto;
    const updatedCountry = await this.prisma.country.update({
      where: { id },
      data: data 
    });
    return updatedCountry;
  };

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.country.delete({ where: { id }});
  };
};
