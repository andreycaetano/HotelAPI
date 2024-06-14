import { 
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";
import { Account } from "../entities/account.entity";

export class CreateAccountDto extends Account {

    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(5)
    role: string;
}
