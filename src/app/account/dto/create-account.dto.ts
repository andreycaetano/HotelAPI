import { 
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";
import { Account } from "../entities/account.entity";

export class CreateAccountDto extends Account {

    @IsString()
    @MinLength(3, { message: 'The username must be at least 3 characters long' })
    @MaxLength(20, { message: 'The username must not exceed 20 characters' })
    username: string;

    @IsString({message: 'Password is required'})
    @MinLength(6, {message: 'The password must be at least 6 characters long'})
    @MaxLength(20, {message: 'The password must not exceed 20 characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsNotEmpty({message: "Email is required"})
    @IsEmail({}, {message: 'The email must be a valid email address'})
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(5)
    role: string;
}
