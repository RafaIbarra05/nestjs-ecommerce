import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe tener al menos una minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address?: string;

  @IsNotEmpty()
  @IsNumberString({}, { message: 'El teléfono debe contener solo números.' })
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  country?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20)
  city?: string;
}
