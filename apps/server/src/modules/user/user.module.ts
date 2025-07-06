import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from '@/entities/user/userProfile.entity';
import { UserPreference } from '@/entities/user/user.preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserPreference]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}