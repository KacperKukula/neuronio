import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user/user.entity';
import { UserProfile } from '@/entities/user/userProfile.entity';
import { UpdateUserPreferencesDto } from 'shared';
import { UserPreference } from '@/entities/user/user.preference.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(UserProfile) private userProfileRepository: Repository<UserProfile>,
        @InjectRepository(UserPreference) private userPreferenceRepository: Repository<UserPreference>
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

    async searchForUsers(searchPhrase: string): Promise<User[]> {
        return this.userRepository.createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email', 'user.photoUrl'])
            .where('user.name LIKE :searchPhrase', { searchPhrase: `%${searchPhrase}%` })
            .orWhere('user.email LIKE :searchPhrase', { searchPhrase: `%${searchPhrase}%` })
            .getMany();
    }

    async getUserPhoto(userId: number): Promise<string|null> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return user?.photoUrl || null;
    }

    async findProfileById(userId: number): Promise<UserProfile | null> {
        const user: User = await this.userRepository.findOne({
            select: ['id'],
            where: { id: userId },
            relations: ['profile']
        });

        return user.profile || null;
    }

    async updateUserProfile(userId: number, newProfile: UserProfile): Promise<UserProfile> {
        const user: User = await this.userRepository.findOne({
            select: ['id'],
            where: { id: userId },
            relations: ['profile']
        });

        if (!user.profile)
            return this.createUserProfile(userId, newProfile);
            
        return this.userProfileRepository.save({ ...user.profile, ...newProfile });
    }

    async createUserProfile(userId: number, userProfile: UserProfile): Promise<UserProfile> {
        const savedProfile = await this.userProfileRepository.save(userProfile);
        await this.userRepository.update(userId, { profile: savedProfile });

        return savedProfile;
    }

    async uploadAvatar(file: Express.Multer.File, userId: number): Promise<string> {
        
        const photoUrl = `/uploads/avatars/${file.filename}`;

        await this.userRepository.update(userId, { photoUrl });
        return photoUrl;
    }

    async savePreference(userId: number, userPref: UpdateUserPreferencesDto) {
        return this.userPreferenceRepository.save({ userId, ...userPref })
    }
}