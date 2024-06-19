import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  create
  (
    @Body() createFacilityDto: CreateFacilityDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.facilityService.create(createFacilityDto, file);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('icon'))
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
    @UploadedFile() file: Express.Multer.File  
  ) {
    return this.facilityService.update(id, updateFacilityDto, file);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(id);
  }
}
