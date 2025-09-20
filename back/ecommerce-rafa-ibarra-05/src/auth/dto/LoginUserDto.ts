import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'juanperez@mail.com',
    description: 'Correo electrónico del usuario registrado',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Contraseña del usuario registrado',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
