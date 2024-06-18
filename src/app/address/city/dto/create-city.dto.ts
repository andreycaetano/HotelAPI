import { IsString } from "class-validator";
import { City } from "../entities/city.entity";

export class CreateCityDto extends City{
    @IsString()
    name: string;

    @IsString()
    countryId: string;
}
