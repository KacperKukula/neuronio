import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/user/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { LoginDto } from './dtos/LoginDto';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async login(loginDto: LoginDto): Promise<User> {
        
        const userPromise = await this.userRepository.findOne({
            where: { email: loginDto.email }
        });

        return userPromise;
    }
}