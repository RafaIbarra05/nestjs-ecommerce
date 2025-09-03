// src/users/users.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
        isAdmi: true,
        orders: {
          id: true,
          date: true,
        },
      },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: Omit<User, 'id'>): Promise<string> {
    const newUser = this.repo.create(data);
    const saved = await this.repo.save(newUser);
    return saved.id;
  }

  async update(id: string, data: Partial<User>): Promise<string> {
    await this.repo.update(id, data);
    return id;
  }

  async delete(id: string): Promise<string> {
    await this.repo.delete(id);
    return id;
  }

  async paginate(page: number, limit: number) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        isAdmi: true,
      },
    });

    return {
      page,
      limit,
      total,
      data: items,
    };
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.repo.find({
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        phone: true,
        country: true,
        city: true,
        isAdmi: true,
      },
    });
    return users;
  }
}
