import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/LoginUserDto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Devuelve un JWT válido por 1 hora.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        expiresIn: 3600,
        user: {
          id: 'uuid',
          name: 'Juan',
          email: 'juan@mail.com',
          isAdmin: false,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Faltan email o password' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  signin(@Body() data: LoginUserDto) {
    return this.authService.signin(data.email, data.password);
  }
  @Post('signup')
  @ApiResponse({
    status: 201,
    description:
      'Usuario creado correctamente (contraseña encriptada, no visible).',
    schema: {
      example: {
        id: 'uuid',
        name: 'Juan',
        email: 'juan@mail.com',
        address: 'Av. Siempre Viva 123',
        phone: '123456789',
        country: 'Argentina',
        city: 'Córdoba',
        isAdmin: false,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Datos inválidos (password y confirmPassword no coinciden o campos faltantes)',
  })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  signup(@Body() data: CreateUserDto) {
    return this.authService.signup(data);
  }
}
