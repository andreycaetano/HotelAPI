import { HttpException, HttpStatus } from "@nestjs/common";

export class CityNotFoundException extends HttpException {
    constructor(cityId: string) {
        super(`Country with ID ${cityId} not found`, HttpStatus.NOT_FOUND)
    }
}