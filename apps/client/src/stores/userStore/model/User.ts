import { Expose } from "class-transformer";

export class User {
    
    @Expose()
    accessToken?: string;

    @Expose()
    email?: string;
}