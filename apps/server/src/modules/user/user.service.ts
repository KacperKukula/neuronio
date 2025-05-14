import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    findByName(name: string) {
        return this.userRepository.findOne({ where: { name } })
    }

    findByEmail(email: string ) {
        return this.userRepository.findOne({ where: { email } })
    }

    create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    searchForUsers(searchPhrase: string): Promise<User[]> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.name LIKE :searchPhrase', { searchPhrase: `%${searchPhrase}%` })
            .orWhere('user.email LIKE :searchPhrase', { searchPhrase: `%${searchPhrase}%` })
            .getMany();
    }
}