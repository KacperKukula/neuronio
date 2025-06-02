export class RegisterForm {
    name: string
    email: string;
    password: string;

    constructor({
        name = '',
        email = '',
        password = ''
    }: RegisterFormParams = {}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

interface RegisterFormParams {
    name?: string;
    email?: string;
    password?: string;
}