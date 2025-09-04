import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository) {}

  signin(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    const user = this.usersRepo.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;
    return {
      message: 'Login exitoso',
      user: safeUser,
    };
  }
}
