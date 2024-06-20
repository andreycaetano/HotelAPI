import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Condition } from './entities/condition.entity';
import { ConditionNotFoundException } from './error/conditionNotFoundException.error';

@Injectable()
export class ConditionService {
  constructor(private readonly prisma: PrismaService) {};

  async create(createConditionDto: CreateConditionDto): Promise<Condition> {
    const data: Prisma.ConditionsCreateInput = createConditionDto;
    const createdCondition = await this.prisma.conditions.create({ data });
    return createdCondition;
  }

  async findAll(): Promise<Condition[]> {
    return await this.prisma.conditions.findMany();
  }

  async findOne(id: string): Promise<Condition> {
    const findCondition = await this.prisma.conditions.findUnique({ where: { id }});
    if (!findCondition) {
      throw new ConditionNotFoundException((id));
    }
    return findCondition;
  }

  async update(id: string, updateConditionDto: UpdateConditionDto): Promise<Condition> {
    await this.findOne(id);
    const data: Prisma.ConditionsUpdateInput = updateConditionDto;
    const updatedCondition = await this.prisma.conditions.update({
      where: { id },
      data
    });
    return updatedCondition;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    const hotelWithCondition = await this.prisma.hotel.findMany({
      where: {
        conditions: {
          some: {
            id: id
          }
        }
      }
    })
    if (hotelWithCondition.length > 0) {
      throw new UnprocessableEntityException(`Cannot delete condition with ID ${id} because it is associated with ${hotelWithCondition.length} hotels.`)
    }
    await this.prisma.conditions.delete({ where: { id }});
  }
}
