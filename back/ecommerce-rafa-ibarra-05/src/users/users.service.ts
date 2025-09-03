import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll(page?: number, limit?: number) {
    const currentPage = page && page > 0 ? page : 1;
    const currentLimit = limit && limit > 0 ? limit : 5;
    return this.usersRepo.paginate(currentPage, currentLimit);
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    return this.usersRepo.findById(id);
  }

  create(data: Omit<User, 'id'>) {
    return this.usersRepo.create(data);
  }

  update(id: string, data: Partial<User>) {
    return this.usersRepo.update(id, data);
  }

  delete(id: string) {
    return this.usersRepo.delete(id);
  }
}
