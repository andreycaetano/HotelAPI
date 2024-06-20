import { Hotel } from "../../entities/hotel.entity";

export class HotelImage {
    id?: string;
    path: string;
    hotelId: string;
    hotel?: Hotel;
}