import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async addUser(
    data: CreateUserDto,
  ): Promise<{ id: string; name: string; email: string }> {
    const newUser = this.repo.create({
      ...data,
      isAdmin: false,
    });
    const savedUser = await this.repo.save(newUser);
    console.log('🧪 savedUser:', savedUser);
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

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
        isAdmin: true,
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
}
