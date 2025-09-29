import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'Nuevo nombre',
    description: 'Nombre del usuario (opcional).',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'nuevo@mail.com',
    description: 'Correo electrónico del usuario (opcional).',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
