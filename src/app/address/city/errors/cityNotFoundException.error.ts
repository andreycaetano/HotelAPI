import { HttpException, HttpStatus } from "@nestjs/common";

export class CityNotFoundException extends HttpException {
    constructor(cityId: string) {
        super(`City with ID ${cityId} not found`, HttpStatus.NOT_FOUND)
    }
}