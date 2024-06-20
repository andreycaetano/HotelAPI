import { IsString } from "class-validator";
import { HotelImage } from "../entities/hotel-image.entity";

export class CreateHotelImageDto extends HotelImage {
    @IsString()
    path: string;

    @IsString()
    hotelId: string;
}