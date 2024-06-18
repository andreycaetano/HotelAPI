import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SportNotFoundException } from './error/sportNotFoundException.error';

@Injectable()
export class SportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSportDto: CreateSportDto): Promise<Sport> {
    const data: Prisma.SportsCreateInput = createSportDto;
    const createdSport = await this.prisma.sports.create({ data });
    return createdSport;
  }

  async findAll(): Promise<Sport[]> {
    return await this.prisma.sports.findMany();
  }

  async findOne(id: string): Promise<Sport> {
    const findSport = await this.prisma.sports.findUnique({ where: { id }});
    if (!findSport) {
      throw new SportNotFoundException(id);
    }
    return findSport;
  }

  async update(id: string, updateSportDto: UpdateSportDto): Promise<Sport> {
    await this.findOne(id);
    const data: Prisma.SportsUpdateInput = updateSportDto;
    const updatedSport = await this.prisma.sports.update({
      where: { id },
      data
    });
    return updatedSport;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id)
    await this.prisma.sports.delete({ where: { id }});
  }
}
