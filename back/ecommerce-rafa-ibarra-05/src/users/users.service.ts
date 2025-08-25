import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
  findAll() {
    return this.usersRepo.findAll();
  }
  findById(id: number) {
    return this.usersRepo.findById(id);
  }

  create(data: Omit<User, 'id'>) {
    return this.usersRepo.create(data);
  }

  update(id: number, data: Partial<User>) {
    return this.usersRepo.update(id, data);
  }

  delete(id: number) {
    return this.usersRepo.delete(id);
  }
}
