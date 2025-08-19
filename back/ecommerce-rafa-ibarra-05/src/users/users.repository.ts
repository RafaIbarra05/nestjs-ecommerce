import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    // datos hardcodeados
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

  findAll(): User[] {
    return this.users;
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }
}
