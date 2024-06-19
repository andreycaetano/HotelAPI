import { FileInterceptor } from "@nestjs/platform-express";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateFacilityDto {
    @IsString()
    @IsNotEmpty({message: 'Facility name is required'})
    facility: string;

    @Type(() => FileInterceptor)
    icon: Express.Multer.File;
}
