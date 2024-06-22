import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from '../auth/decorators/isPublic.decorator';
import { GaleryService } from './galery.service';
import { CreateGaleryDto } from './dto/create-galery.dto';

@Controller('galery')
export class GaleryController {
  constructor(private readonly galeryService: GaleryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('galery', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg|jfif|avif|apng|tiff|bmp|heic|heif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  create(
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.galeryService.create(file)
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.galeryService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeryService.findOne(id);
  }
  
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('galery', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|svg|jfif|avif|apng|tiff|bmp|heic|heif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.galeryService.update(id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeryService.remove(id);
  }

  @Post('movie')
  @UseInterceptors(
    FileInterceptor('galeryMovie', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(mp4|mkv|wmv|mov|avi|webm|flv|m4v|3gp|mpg|mpeg)$/)) {
          return cb(new Error('Only video files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  createMovie(@UploadedFile() file: Express.Multer.File) {
    return this.galeryService.createMovie(file)
  }

  @Patch('movie/:id')
  @UseInterceptors(
    FileInterceptor('galeryMovie', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(mp4|mkv|wmv|mov|avi|webm|flv|m4v|3gp|mpg|mpeg)$/)) {
          return cb(new Error('Only video files are allowed!'), false);
        }
        cb(null, true);
      },
    })
  )
  updateMovie(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.galeryService.updateMovie(id, file)
  }
}
