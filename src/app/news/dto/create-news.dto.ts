import { FileInterceptor } from "@nestjs/platform-express";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    content: string;

    @Type(() => FileInterceptor)
    banner: Express.Multer.File;

    @IsString()
    author: string;
}
