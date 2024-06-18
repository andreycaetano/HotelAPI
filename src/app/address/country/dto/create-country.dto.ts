import { IsString } from "class-validator";
import { Country } from "../entities/country.entity";

export class CreateCountryDto extends Country {
    @IsString({message: "country's name is required"})
    name: string;
}
