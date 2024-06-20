import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class HotelImagesService {
    constructor(
        private readonly upload: UploadService,
        private readonly prisma: PrismaService
    ) {};

    async create (hotelId: string, files: Express.Multer.File[]) {
        const hotelImages = this.upload.groupFilesByField(files, ['hotel'])['hotel']

        await Promise.all(hotelImages.map(async (element) => {
            const photokey = await this.upload.uploadFile(element, `hotel/${hotelId}`)
            await this.prisma.hotelImages.create({ 
                data: {
                    path: photokey,
                    hotelId: hotelId
            }})
        }))
    }

    async delete (hotelId: string) {
        const findImagesHotel = await this.prisma.hotelImages.findMany({ where: { hotelId: hotelId }});

        await Promise.all(findImagesHotel.map(async (element) => {
            await this.upload.deleteFile(element.path)
            await this.prisma.hotelImages.delete({ where: {id: element.id }})
        }))
    }

    async update (hotelId: string, files: Express.Multer.File[]) {
        await this.delete(hotelId);
        await this.create(hotelId, files)
    }
}
