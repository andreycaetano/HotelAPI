import { HttpException, HttpStatus } from "@nestjs/common";

export class FacilityNotFoundException extends HttpException{
    constructor(facilityId: string) {
        super(`Rating with ID ${facilityId} not found`, HttpStatus.NOT_FOUND)
    }
}