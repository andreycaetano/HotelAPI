import { Description } from "../../entities/description.entity";

export class Comment {
    id?: string;
    author: string;
    photo?: string;
    comment: string;
    description?: Description
}