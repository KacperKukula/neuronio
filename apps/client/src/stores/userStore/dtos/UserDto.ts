import "reflect-metadata";
import { IsString, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    accessToken?: string;

    @IsString()
    @IsNotEmpty()
    email?: string;
}