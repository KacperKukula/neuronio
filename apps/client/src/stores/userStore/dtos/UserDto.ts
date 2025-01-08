import "reflect-metadata";

import { IsString, IsNotEmpty } from "class-validator";
import { Expose, Type } from "class-transformer";

export class UserDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    accessToken?: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    email?: string;

    // @Expose()
    // @Type(() => Date)
    // @IsString()
    // creationTime?: Date;
}