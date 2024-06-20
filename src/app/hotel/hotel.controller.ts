import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { HotelService } from './hotel.service';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { IsPublic } from '../auth/decorators/isPublic.decorator';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|mp4|mkv|wmv|mov|avi|webm|flv|m4v|3gp|mpg|mpeg|webp|svg|jfif|avif|apng|tiff|bmp|heic|heif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  create(
    @Body() createHotelDto: CreateHotelDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return this.hotelService.create(createHotelDto, files);
  }

  @IsPublic()
  @Get()
  findAll(@Query() searchHotelDto: SearchHotelDto) {
    return this.hotelService.findAll(searchHotelDto);
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('image/:id')
  deleteImageHotel(@Param('id') id: string) {
    return this.hotelService.deleteImageHotel(id);
  }
}
