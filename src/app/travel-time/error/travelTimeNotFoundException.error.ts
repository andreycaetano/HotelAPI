import { HttpException, HttpStatus } from "@nestjs/common";

export class TravelTimeNotFoundException extends HttpException {
    constructor(travelTimeId: string) {
        super(`Travel time with ID ${travelTimeId} not found`, HttpStatus.NOT_FOUND)
    };
};