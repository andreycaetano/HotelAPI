import { HttpException, HttpStatus } from "@nestjs/common";

export class CountryNotFoundException extends HttpException {
    constructor(countryId: string) {
        super(`Country with ID ${countryId} not found`, HttpStatus.NOT_FOUND)
    }
}