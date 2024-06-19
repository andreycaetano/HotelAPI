import { IsNotEmpty, IsString } from "class-validator";
import { City } from "../entities/city.entity";

export class CreateCityDto extends City {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty({message: 'CountryId is required'})
    countryId: string;
}
