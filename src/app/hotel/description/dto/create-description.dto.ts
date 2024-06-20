import { IsJSON, IsString } from "class-validator";
import { Comment } from "../comment/entities/comment.entity";
import { Description } from "../entities/description.entity";

export class CreateDescriptionDto extends Description {
    @IsString()
    accommodation: string;

    @IsString()
    activities: string;

    @IsString()
    destination: string;

    @IsJSON()
    comment?: Comment;
}