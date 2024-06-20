import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Prisma } from '@prisma/client';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
    constructor(
        private readonly prisma: PrismaService
    ) {};

    async create (createCardDto: CreateCardDto): Promise<Card> {        
        const data: Prisma.CardCreateWithoutHotelInput = JSON.parse(createCardDto as unknown as string)
        const createdCard = await this.prisma.card.create({ data });
        return createdCard;
    }

    async update (cardId: string, updateCardDto: UpdateCardDto): Promise<Card> {
        await this.findOne(cardId);
        const data: Prisma.CardUpdateWithoutHotelInput = JSON.parse(updateCardDto as unknown as string);
        const updatedCard = await this.prisma.card.update({
            where: { id: cardId },
            data
        });
        return updatedCard;
    }

    async findOne (cardId: string): Promise<Card> {
        const findCard = await this.prisma.card.findUnique({
            where: { id: cardId}
        });
        if (!findCard) {
            throw new NotFoundException(`Rating with ID ${cardId} not found`)
        };
        return findCard;
    }

    async delete (cardId: string): Promise<void> {
        this.findOne(cardId);
        await this.prisma.card.delete({ where: { id: cardId }});
    }
}
