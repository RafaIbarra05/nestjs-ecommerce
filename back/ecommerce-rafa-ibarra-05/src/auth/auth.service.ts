import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async signin(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    const user = await this.usersRepo.findByEmailWithPassword(
      email.toLocaleLowerCase(),
    );

    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!user || !isMatch) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.isAdmin ? Role.Admin : Role.User,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;
    return {
      message: 'Login exitoso',
      token,
      user: safeUser,
    };
  }

  async signup(data: CreateUserDto) {
    const {
      name,
      email,
      password,
      confirmPassword,
      address,
      phone,
      country,
      city,
    } = data;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const userExists = await this.usersRepo.findByEmail(email);
    if (userExists) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersRepo.addUser({
      name,
      email: email.toLocaleLowerCase(),
      password: hashedPassword,
      address,
      phone,
      country,
      city,
    });
    console.log('SIGNUP DEBUG:', {
      plain: password,
      hashed: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = createdUser;
    return safeUser;
  }
}
