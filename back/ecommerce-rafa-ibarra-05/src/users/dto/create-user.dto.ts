import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'juan@mail.com',
    description: 'Correo electrónico del usuario. Debe ser único y válido.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Juan perez',
    description: 'Nombre completo del usuario.',
    minLength: 3,
    maxLength: 80,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Contraseña entre 8 y 15 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*).',
    minLength: 8,
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @ApiProperty({
    example: 'Password123!',
    description:
      'Confirmación de contraseña, debe coincidir con el campo password.',
    minLength: 8,
    maxLength: 15,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Match('password', { message: 'Las contraseñas no coinciden' })
  confirmPassword: string;

  @ApiProperty({
    example: 'Av. Siempre Viva 123',
    description: 'Dirección del usuario.',
    minLength: 3,
    maxLength: 80,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address?: string;

  @ApiProperty({
    example: '123456789',
    description: 'Número de teléfono (solo números).',
  })
  @IsNotEmpty()
  @IsNumberString({}, { message: 'El teléfono debe contener solo números.' })
  phone?: string;

  @ApiProperty({
    example: 'Argentina',
    description: 'País de residencia.',
    minLength: 5,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  @ApiProperty({
    example: 'Córdoba',
    description: 'Ciudad de residencia.',
    minLength: 5,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;
}
