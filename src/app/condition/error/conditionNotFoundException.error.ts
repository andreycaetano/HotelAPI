import { HttpException, HttpStatus } from "@nestjs/common";

export class ConditionNotFoundException extends HttpException{
    constructor(conditionId: string) {
        super(`Rating with ID ${conditionId} not found`, HttpStatus.NOT_FOUND)
    }
}