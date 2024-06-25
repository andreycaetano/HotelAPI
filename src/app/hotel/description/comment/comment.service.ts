import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UploadService } from 'src/upload/upload.service';
import { Prisma } from '@prisma/client';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly upload: UploadService
    ) {}

    async create (createCommentDto: CreateCommentDto, file: Express.Multer.File): Promise<Comment> {        
        const photoKey = await this.upload.uploadFile(file, 'hotel/authors')
        const data: Prisma.CommentCreateWithoutDescriptionInput = {
            ...createCommentDto,
            photo: photoKey
        };
        const createdComment = await this.prisma.comment.create({ data });
        return createdComment;
    }

    async findOne (commentId: string): Promise<Comment> {
        const findComment = await this.prisma.comment.findUnique({ where: { id: commentId }})
        if (!findComment) {
            throw new NotFoundException(`Comment with ID ${commentId} not found`)
        }
        return findComment
    }

    async update (commentId: string, updateCommentDto: UpdateCommentDto, file?: Express.Multer.File): Promise<Comment> {
        const findComment = await this.findOne(commentId);
        const data: Prisma.CommentUpdateWithoutDescriptionInput = {}
        if (updateCommentDto) {
            if (updateCommentDto.author !== undefined) data.author = updateCommentDto.author;
            if (updateCommentDto.comment !== undefined) data.comment = updateCommentDto.comment;
        }
        let photoKey = null
        if (file) {
            if (findComment.photo) {
                await this.upload.deleteFile(findComment.photo);
            }
            photoKey = await this.upload.uploadFile(file, 'hotel/authors')
        }
        
        const updatedComment = await this.prisma.comment.update({
            where: { id: commentId},
            data: {
                ...data,
                photo: file && photoKey
            }
        });
        return updatedComment;
    }

    async delete (commentId: string): Promise<void> {
        const findComment = await this.findOne(commentId);
        await this.upload.deleteFile(findComment.photo);
        await this.prisma.comment.delete({ where: { id: commentId }});
    }
}
