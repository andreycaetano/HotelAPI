import { HttpException, HttpStatus } from "@nestjs/common";

export class CountryNotFoundException extends HttpException {
    constructor(message: string = 'Country not found') {
        super(message, HttpStatus.NOT_FOUND)
    }
}