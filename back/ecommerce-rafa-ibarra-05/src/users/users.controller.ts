import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({})
export class UsersController {
  usersService: UsersService;
  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }
  @Get('/users')
  getUsers() {
    return this.usersService.userService();
  }
}
