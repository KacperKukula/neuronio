import ky from "ky";
import { HttpService } from "@/modules/httpService/httpService";
import { LoginDto, RegisterDto } from 'shared';
import type { User } from "@/stores/userStore/model/User";
import { ValidationError } from "class-validator";

export class AuthService extends HttpService {

    static async login(loginDto: LoginDto): Promise<{ user: User, access_token: string }> {
        return ky.post('http://localhost:3000/auth/signin', { json: loginDto }).json();
    }

    static async register(registerDto: RegisterDto): Promise<{ errors: ValidationError[] }> {
        return ky.post('http://localhost:3000/auth/register', { json: registerDto }).json();
    }
}