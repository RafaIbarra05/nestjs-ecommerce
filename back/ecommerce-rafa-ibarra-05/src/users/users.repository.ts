import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'alice@example.com',
      name: 'Alice',
      password: '123456',
      address: 'Av. Siempre Viva 742',
      phone: '+54 9 351 555-0001',
      country: 'Argentina',
      city: 'Córdoba',
    },
    {
      id: 2,
      email: 'bob@example.com',
      name: 'Bob',
      password: '654321',
      address: 'Calle Falsa 123',
      phone: '+54 9 11 555-0002',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
  ];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findById(id: number): Omit<User, 'password'> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return rest;
  }
  create(data: Omit<User, 'id'>): number {
    const id = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    this.users.push({ id, ...data });
    return id;
  }

  update(id: number, data: Partial<User>): number {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users[index] = { ...this.users[index], ...data };
    return id;
  }

  delete(id: number): number {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
    return id;
  }
}
