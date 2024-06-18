import { IsNotEmpty, IsString } from "class-validator";
import { Condition } from "../entities/condition.entity";

export class CreateConditionDto extends Condition {
    @IsString()
    @IsNotEmpty({message: 'Condition is required'})
    condition: string;
}
