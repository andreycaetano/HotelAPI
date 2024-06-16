import { HttpException, HttpStatus } from "@nestjs/common";

export class AccountConflictException extends HttpException {
    constructor(message: string = 'Username or Email already exists') {
        super(message, HttpStatus.CONFLICT)
    }
}