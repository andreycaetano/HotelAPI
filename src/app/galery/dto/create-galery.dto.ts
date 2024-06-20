import { FileInterceptor } from "@nestjs/platform-express";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateGaleryDto {
    @Type(() => FileInterceptor)
    galery: Express.Multer.File;
}
