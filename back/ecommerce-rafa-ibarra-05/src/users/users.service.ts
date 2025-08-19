import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
  getAll(): User[] {
    return this.usersRepo.findAll();
  }
}
