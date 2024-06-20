import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Rating } from './entities/rating.entity';
import { Prisma } from '@prisma/client';
import { RatingNotFoundException } from './error/ratingNotFoundException.error';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {};

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const data: Prisma.RatingsCreateInput = createRatingDto;
    const createdRating = await this.prisma.ratings.create({ data });
    return createdRating;
  };

  async findAll(): Promise<Rating[]> {
    return await this.prisma.ratings.findMany();
  };

  async findOne(id: string): Promise<Rating> {
    const findRating = await this.prisma.ratings.findUnique({ where: { id }});
    if (!findRating) {
      throw new RatingNotFoundException(id);
    };
    return findRating;
  };

  async update(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    await this.findOne(id);
    const data: Prisma.RatingsUpdateInput = updateRatingDto;
    const updatedRating = await this.prisma.ratings.update({
      where: { id },
      data
    });
    return updatedRating;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    const hotelWithRating = await this.prisma.hotel.findMany({
      where: {
        ratings: { id: id }
      }
    })
    if (hotelWithRating.length > 0) {
      throw new UnprocessableEntityException(`Cannot delete rating with ID ${id} because it is associated with ${hotelWithRating.length} hotels.`)
    }
    await this.prisma.ratings.delete({ where: { id }});
  };
};
