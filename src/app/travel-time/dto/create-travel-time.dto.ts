import { IsNotEmpty, IsString } from "class-validator";
import { TravelTime } from "../entities/travel-time.entity";

export class CreateTravelTimeDto extends TravelTime {
    @IsString()
    @IsNotEmpty({message: "Travel time is required"})
    travel_time: string;
}
