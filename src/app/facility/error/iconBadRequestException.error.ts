import { HttpException, HttpStatus } from "@nestjs/common";

export class IconBadRequestException extends HttpException {
    constructor() {
        super('Icon is required', HttpStatus.BAD_REQUEST)
    }
}