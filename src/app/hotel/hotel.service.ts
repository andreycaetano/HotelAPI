import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { CardService } from './card/card.service';
import { DescriptionService } from './description/description.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelImagesService } from './hotel-images/hotel-images.service';
import { NotFound } from '@aws-sdk/client-s3';

@Injectable()
export class HotelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cardService: CardService,
    private readonly upload: UploadService,
    private readonly descriptionService: DescriptionService,
    private readonly hotelImageService: HotelImagesService
  ) { };

  async create(createHotelDto: CreateHotelDto, files: Array<Express.Multer.File>) {
    const card = await this.cardService.create(createHotelDto.card)
    const description = await this.descriptionService.create(createHotelDto.description, files)

    const hotelMovie = this.upload.groupFilesByField(files, ['hotelMovie'])['hotelMovie'][0]

    const data: Prisma.HotelCreateInput = {
      card: { connect: { id: card.id } },
      description: { connect: { id: description.id } },
      city: { connect: { id: createHotelDto.cityId } },
      name: createHotelDto.name,
      ratings: { connect: { id: createHotelDto.ratingId } },
      conditions: {
        connect: JSON.parse(createHotelDto.conditions).map((conditionId: string) => ({ id: conditionId }))
      },
      facilities: {
        connect: JSON.parse(createHotelDto.facilities).map((facilityId: string) => ({ id: facilityId }))
      },
      sports: {
        connect: JSON.parse(createHotelDto.sports).map((sportId: string) => ({ id: sportId }))
      },
      promotion: Boolean(createHotelDto.promotion),
    }
    const createdHotel = await this.prisma.hotel.create({ data });

    await this.hotelImageService.create(createdHotel.id, files)
    await this.prisma.hotel.update({
      where: { id: createdHotel.id },
      data: {
        movie: await this.upload.uploadFile(hotelMovie, `hotel/${createdHotel.id}/movie`)
      }
    })

    return await this.findOne(createdHotel.id);
  }

  async findAll() {
    return await this.prisma.hotel.findMany({select: this.allIncludeRelation()});
  }

  async findOne(id: string) {
    const findHotel = await this.prisma.hotel.findUnique({
      where: {
        id: id
      },
      select: this.allIncludeRelation()
    });

    if (!findHotel) {
      throw new NotFoundException(`Hotel with ID ${id} not found`)
    }

    return findHotel;
  }

  async update(id: string, updateHotelDto: UpdateHotelDto, files?: Express.Multer.File[]) {
    const findHotel = await this.findOne(id);
    let card
    let description

    if (updateHotelDto.card) {
      card = await this.cardService.update(findHotel.card.id, updateHotelDto.card)
    }
    if (updateHotelDto.description) {
      const photo = this.upload.groupFilesByField(files, ['author'])[0]
      description = await this.descriptionService.update(findHotel.description.id, updateHotelDto.description, photo && photo )
    }

    const hotelMovie = this.upload.groupFilesByField(files, ['hotelMovie'])?.[0]

    const data: Prisma.HotelUpdateInput = {
      ...(updateHotelDto.card && { card: { connect: { id: card.id }}}),
      ...(updateHotelDto.description && { description: { connect: {id: description.id}}}),
      ...(updateHotelDto.cityId && { city: { connect: { id: updateHotelDto.cityId }}}),
      ...(updateHotelDto.name && {name: updateHotelDto.name}),
      ...(updateHotelDto.ratingId && { ratings: { connect: { id: updateHotelDto.ratingId}}}),
      ...(updateHotelDto.conditions && {
        conditions: {
          connect: JSON.parse(updateHotelDto.conditions).map((conditionId: string) => ({ id: conditionId }))
        }
      }),
      ...(updateHotelDto.facilities && {
        facilities: {
          connect: JSON.parse(updateHotelDto.facilities).map((facilityId: string) => ({ id: facilityId }))
        }
      }),
      ...(updateHotelDto.sports && {
        sports: {
          connect: JSON.parse(updateHotelDto.sports).map((sportId: string) => ({ id: sportId }))
        }
      }),
      ...(updateHotelDto.promotion !== undefined && { promotion: Boolean(updateHotelDto.promotion)})
    }

    await this.prisma.hotel.update({
      where: { id },
      data
    });

    if (files.length > 0) {
      await this.hotelImageService.update(id, files)
    }

    if (hotelMovie) {
      await this.upload.deleteFile(findHotel.movie)
      await this.prisma.hotel.update({
        where: { id },
        data: {
          movie: await this.upload.uploadFile(hotelMovie, `hotel/${id}/movie`)
        }
      })
    }
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.hotelImageService.delete(id)
    await this.prisma.hotel.delete({ where: { id: id }});
  }

  allIncludeRelation() {
    return {
      id: true,
      name: true,
      description: {
        select: {
          id: true,
          destination: true,
          accommodation: true,
          activities: true,
          comment: true
        }
      },
      movie: true,
      images: true,
      promotion: true,
      city: {
        select: {
          id: true,
          name: true,
          country: true
        }
      },
      card: true,
      ratings: true,
      conditions: true,
      facilities: true,
      sports: true
    }
  }
}
