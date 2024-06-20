import { Rating } from "src/app/rating/entities/rating.entity";
import { HotelImage } from "../hotel-images/entities/hotel-image.entity";
import { City } from "src/app/address/city/entities/city.entity";
import { Card } from "../card/entities/card.entity";
import { Description } from "../description/entities/description.entity";

export class Hotel {
    id?: string;
    name: string;
    movie: string;
    promotion: boolean;
    cardId?: string;
    ratingId: string;
    images?: HotelImage[];
    conditions?: string[];
    facilities?: string[];
    sports?: string[];

    ratings?: Rating;
    city?: City;
    card?: Card;
    description?: Description;
}
