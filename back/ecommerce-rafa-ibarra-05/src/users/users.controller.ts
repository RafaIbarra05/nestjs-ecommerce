import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller({})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/users')
  findAll(): User[] {
    return this.usersService.getAll();
  }
}
