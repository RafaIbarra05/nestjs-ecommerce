import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  repo: any;
  constructor(private readonly usersRepo: UsersRepository) {}

  findAll(page?: number, limit?: number) {
    const currentPage = page && page > 0 ? page : 1;
    const currentLimit = limit && limit > 0 ? limit : 5;
    return this.usersRepo.paginate(currentPage, currentLimit);
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    return this.usersRepo.findById(id);
  }
  async create(
    userDto: CreateUserDto,
  ): Promise<{ id: string; name: string; email: string }> {
    return this.usersRepo.addUser(userDto);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.usersRepo.findById(id);
    if (!user)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return this.usersRepo.update(id, data);
  }
  async delete(id: string) {
    await this.usersRepo.delete(id);
    return { message: 'Usuario eliminado correctamente' };
  }
}
