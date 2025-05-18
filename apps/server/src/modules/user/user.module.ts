import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/user/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProfile } from '@/entities/user/userProfile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}