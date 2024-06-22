import { FileInterceptor } from "@nestjs/platform-express";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    name: string;

    @IsString()
    role: string;

    @Type(() => FileInterceptor)
    team: Express.Multer.File;
}
