import { IsNotEmpty, IsString } from "class-validator";
import { Sport } from "../entities/sport.entity";

export class CreateSportDto extends Sport {
    @IsString()
    @IsNotEmpty({message: 'Sport name is required'})
    sport: string;
}
