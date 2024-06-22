import { FileInterceptor } from "@nestjs/platform-express";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateSliderDto { 
    @IsString()
    title: string;

    @IsString()
    information: string;

    @IsString()
    comment: string;

    @IsString()
    author: string;

    @Type(() => FileInterceptor)
    slider: Express.Multer.File;
}
