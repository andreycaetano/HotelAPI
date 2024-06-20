import { IsNotEmpty, IsString } from "class-validator";
import { Comment } from "../entities/comment.entity";

export class CreateCommentDto extends Comment {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}