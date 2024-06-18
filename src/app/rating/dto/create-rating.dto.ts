import { IsNotEmpty, IsString } from "class-validator";
import { Rating } from "../entities/rating.entity";

export class CreateRatingDto extends Rating {
    @IsString()
    @IsNotEmpty({message: 'Rating is required'})
    rating: string;
}
