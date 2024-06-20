import { Comment } from "../comment/entities/comment.entity";

export class Description {
    id?: string;
    destination: string;
    accommodation: string;
    activities: string;
    commentId: string;
    comment?: Comment;
}