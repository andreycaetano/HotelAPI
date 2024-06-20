import { IsNotEmpty, IsString } from "class-validator";
import { Card } from "../entities/card.entity";

export class CreateCardDto extends Card {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description_big: string;

    @IsNotEmpty()
    @IsString()
    description1: string;

    @IsNotEmpty()
    @IsString()
    description2: string;

    @IsNotEmpty()
    @IsString()
    description3: string;
}