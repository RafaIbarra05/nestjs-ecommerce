import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}
  findAll(page?: number, limit?: number) {
    const currentPage = page && page > 0 ? page : 1;
    const currentLimit = limit && limit > 0 ? limit : 5;

    return this.usersRepo.paginate(currentPage, currentLimit);
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
