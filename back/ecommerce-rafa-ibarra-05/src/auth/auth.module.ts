import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
