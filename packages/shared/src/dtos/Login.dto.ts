import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    password!: string;
}