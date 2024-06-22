import { IsJSON, IsString } from "class-validator";
import { CreateCardDto } from "../card/dto/create-card.dto";
import { CreateDescriptionDto } from "../description/dto/create-description.dto";

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
}

