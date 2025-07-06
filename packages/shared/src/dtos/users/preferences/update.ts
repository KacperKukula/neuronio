import { IsOptional, IsString } from "class-validator";

export class UpdateUserPreferencesDto {
    @IsString()
    @IsOptional()
    locale: string;
}