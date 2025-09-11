import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import type { PaginationResult } from '../common/types/pagination-result';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['orders'],
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        isAdmin: true,
        orders: {
          id: true,
          date: true,
        },
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repo.findOne({ where: { email } });
  }

  async addUser(data: CreateUserDto): Promise<User> {
    const newUser = this.repo.create({
      ...data,
      isAdmin: false,
    });

    return await this.repo.save(newUser); // Devuelve el usuario completo, incl. password
  }
}
/* 
  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.repo.preload({ id, ...data });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.repo.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repo.delete(id);
    if (!result.affected) {
      throw new NotFoundException('Usuario no encontrado');
    }
  } */
async paginate(page?: number, limit?: number): Promise<PaginationResult<User>> {
  const currentPage = typeof page === 'number' && page > 0 ? page : 1;
  const currentLimit = typeof limit === 'number' && limit > 0 ? limit : 5;

  const [items, total] = await this.repo.findAndCount({
    skip: (currentPage - 1) * currentLimit,
    take: currentLimit,
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      phone: true,
      country: true,
      city: true,
      isAdmin: true,
    },
  });

  return {
    page: currentPage,
    limit: currentLimit,
    total,
    data: items,
  };
}


/* 
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.repo.find({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        isAdmin: true,
      },
    });
  }
} */
 
