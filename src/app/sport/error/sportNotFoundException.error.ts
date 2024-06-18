import { HttpException, HttpStatus } from "@nestjs/common";

export class SportNotFoundException extends HttpException{
    constructor(sportId: string) {
        super(`Sport with ID ${sportId} not found`, HttpStatus.NOT_FOUND)
    }
}