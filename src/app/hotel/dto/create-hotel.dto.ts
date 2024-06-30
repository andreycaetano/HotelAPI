import { IsBooleanString, IsJSON, IsOptional, IsString } from "class-validator";
import { CreateCardDto } from "../card/dto/create-card.dto";
import { CreateDescriptionDto } from "../description/dto/create-description.dto";
import { Type } from "class-transformer";
import { FileInterceptor } from "@nestjs/platform-express";

export class CreateHotelDto {
    @IsString()
    name: string

    @IsString()
    promotion: string;
    
    @IsString()
    cityId: string;

    @IsString()
    ratingId: string;
    
    @IsString()
    conditions: string;

    @IsString()
    facilities: string;

    @IsString()
    sports: string;

    @IsString()
    travelTime: string;

    @IsJSON()
    card: CreateCardDto

    @IsJSON()
    description: CreateDescriptionDto

    @IsOptional()
    @Type(() => FileInterceptor)
    hotelMovie: Express.Multer.File

    @IsBooleanString()
    slider_display: string;

    @IsString()
    description_card: string;
}

