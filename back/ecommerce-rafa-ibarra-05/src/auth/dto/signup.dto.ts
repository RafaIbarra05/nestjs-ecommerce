import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    example: 'Juan Perez',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'juanperez@mail.com',
    description: 'Correo electrónico único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Contraseña del usuario (mínimo 6 caracteres). Se recomienda incluir mayúsculas, minúsculas, números y caracteres especiales.',
    minLength: 6,
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Confirmación de contraseña, debe coincidir con el campo password',
    minLength: 6,
  })
  @MinLength(6)
  confirmPassword: string;
}
