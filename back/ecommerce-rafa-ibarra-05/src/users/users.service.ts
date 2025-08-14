import { Injectable } from '@nestjs/common';
@Injectable()
export class UsersService {
  userService() {
    return 'Obtener todos los usuarios';
  }
}
