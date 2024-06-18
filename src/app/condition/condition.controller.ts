import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ConditionService } from './condition.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @Post()
  create(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionService.create(createConditionDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.conditionService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConditionDto: UpdateConditionDto) {
    return this.conditionService.update(id, updateConditionDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conditionService.remove(id);
  }
}
