import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { CardService } from './card/card.service';
import { DescriptionService } from './description/description.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelImagesService } from './hotel-images/hotel-images.service';

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

    const hotelMovie = this.upload.groupFilesByField(files, ['hotelMovie'])['hotelMovie']?.[0]

    const data: Prisma.HotelCreateInput = {      description_card: createHotelDto.description_card,
      sliderDisplay: createHotelDto.slider_display === 'true',
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
      travelTime: {
        connect: JSON.parse(createHotelDto.travelTime).map((travelTimeId: string) => ({ id: travelTimeId }))
      },
      promotion: Boolean(createHotelDto.promotion),
    }
    const createdHotel = await this.prisma.hotel.create({ data });

    await this.hotelImageService.create(createdHotel.id, files)
    if (hotelMovie) {
      await this.prisma.hotel.update({
        where: { id: createdHotel.id },
        data: {
          movie: await this.upload.uploadFile(hotelMovie, `hotel/${createdHotel.id}/movie`)
        }
      })
    }

    return await this.findOne(createdHotel.id);
  }

  async findAll(searchHotelDto: SearchHotelDto) {
    const { name, ratingid, cityId, condition, traveltime, sport, city, facilities, country } = searchHotelDto;

    const where: any = {};

    if (name && name.length > 0) {
      where.name = {
        equals: name,
      };
    }

    if (ratingid && ratingid.length > 0) {
      where.ratingId = {
        equals: ratingid,
      };
    }

    if (cityId && cityId.length > 0) {
      where.cityId = {
        equals: cityId,
      };
    }

    if (condition && condition.length > 0) {
      where.conditions = {
        some: {
          id: condition,
        },
      };
    }

    if (traveltime && traveltime.length > 0) {
      where.travelTime = {
        some: {
          id: traveltime,
        },
      };
    }

    if (sport && sport.length > 0) {
      where.sports = {
        some: {
          id: sport,
        },
      };
    }

    if (city && city.length > 0) {
      where.city = {
        name: {
          equals: city,
        },
      };
    }

    if (facilities && facilities.length > 0) {
      where.facilities = {
        some: {
          id: facilities,
        },
      };
    }

    if (country && country.length > 0) {
      where.city = {
        countryId: {
          equals: country,
        },
      };
    }
    return await this.prisma.hotel.findMany({where ,select: this.allIncludeRelation()});
  }

  async findOne(id: string) {
    const findHotel = await this.prisma.hotel.findUnique({
      where: {id: id},
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
      const photo = this.upload.groupFilesByField(files, ['author'])['author'][0]
      description = await this.descriptionService.update(findHotel.description.id, updateHotelDto.description, photo && photo )
    }

    const hotelMovie = this.upload.groupFilesByField(files, ['hotelMovie'])['hotelMovie']?.[0]

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
      ...(updateHotelDto.promotion !== undefined && { promotion: Boolean(updateHotelDto.promotion)}),
      ...(updateHotelDto.slider_display !== undefined && { sliderDisplay: Boolean(updateHotelDto.slider_display)}),
      ...(updateHotelDto.travelTime && {
        travelTime: {
          connect: JSON.parse(updateHotelDto.travelTime).map((travelTimeId: string) => ({ id: travelTimeId }))
        }
      }),
      ...(updateHotelDto.description_card !== undefined && {description_card: updateHotelDto.description_card})
    }

    await this.prisma.hotel.update({
      where: { id: id },
      data: {
        ...data
      }
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
      travelTime: true,
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

  async deleteImageHotel(id: string): Promise<void> {
    const findImage = await this.prisma.hotelImages.findUnique({ where: { id } });
    if (!findImage) {
      throw new NotFoundException(`Hotel image with ID ${id} not found.`);
    }
  
    const hotel = await this.prisma.hotel.findFirst({
      where: { images: { some: { id } } },
      include: { images: true },
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel with image ID ${id} not found.`);
    }
  
    await this.prisma.$transaction(async (prisma) => {
      try {
        await this.upload.deleteFile(findImage.path);
        const filterImages = hotel.images.filter((image) => image.id !== id);
        await prisma.hotel.update({
          where: { id: hotel.id },
          data: {
            images: {
              connect: filterImages.map((image) => ({ id: image.id })),
            },
          },
        });
      } catch (error) {
        throw new Error(`Failed to delete image ${id} from hotel: ${error.message}`);
      }
    });
  }
}
