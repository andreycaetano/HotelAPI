import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CommentService } from './comment/comment.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UploadService } from 'src/upload/upload.service';
import { Prisma } from '@prisma/client';
import { Description } from './entities/description.entity';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@Injectable()
export class DescriptionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commentService: CommentService,
        private readonly upload: UploadService
    ) { };

    async create(createDescriptionDto: CreateDescriptionDto, file: Express.Multer.File[]): Promise<Description> {      
        const commentPhotoAuthor = this.upload.groupFilesByField(file, ['author']);
        const data = JSON.parse(createDescriptionDto as unknown as string);

        const createdComment = await this.commentService.create(data.comment, commentPhotoAuthor['author'][0]);

        const dataDescription: Prisma.DescriptionsCreateInput = {
            ...JSON.parse(createDescriptionDto as unknown as string),
            comment: {
                connect: { id: createdComment.id }
            }
        };
        const createdDescription = await this.prisma.descriptions.create({ data: dataDescription });
        
        return createdDescription;
    };

    async findOne (descriptionId): Promise<Description> {
        const findDescription = await this.prisma.descriptions.findUnique({ where: { id: descriptionId }});

        if (!findDescription) {
            throw new NotFoundException(`Rating with ID ${descriptionId} not found`)
        }

        return findDescription;
    }

    async delete (descriptionId): Promise<void> {
        const findDescription = await this.findOne(descriptionId);
        await this.commentService.delete(findDescription.commentId);
        await this.prisma.descriptions.delete({ where: { id: descriptionId }});
    }

    async update (descriptionId: string, updateDescriptionDto: UpdateDescriptionDto, file?: Express.Multer.File): Promise<Description> {
        const data = JSON.parse(updateDescriptionDto as unknown as string);
        const findDescription = await this.findOne(descriptionId);

        if (data.comment) {
            await this.commentService.update(data.comment.id, data.comment, file);
        };
        
        const dataDescription: Prisma.DescriptionsUpdateWithoutHotelInput = {
            accommodation: data.accommodation,
            activities: data.activities,
            destination: data.destination
        };

        const updatedDescription = await this.prisma.descriptions.update({
            where: { id: descriptionId },
            data: dataDescription
        });
        
        return updatedDescription;
    }
};
