import { HttpException, HttpStatus } from "@nestjs/common";

export class RatingNotFoundException extends HttpException{
    constructor(ratingId: string) {
        super(`Rating with ID ${ratingId} not found`, HttpStatus.NOT_FOUND)
    }
}