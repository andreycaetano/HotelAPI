import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TravelTimeService } from './travel-time.service';
import { CreateTravelTimeDto } from './dto/create-travel-time.dto';
import { UpdateTravelTimeDto } from './dto/update-travel-time.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('travel-time')
export class TravelTimeController {
  constructor(private readonly travelTimeService: TravelTimeService) {}

  @Post()
  create(@Body() createTravelTimeDto: CreateTravelTimeDto) {
    return this.travelTimeService.create(createTravelTimeDto);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.travelTimeService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelTimeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelTimeDto: UpdateTravelTimeDto) {
    return this.travelTimeService.update(id, updateTravelTimeDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelTimeService.remove(id);
  }
}
