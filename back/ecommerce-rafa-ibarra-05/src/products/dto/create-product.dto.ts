import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Asus ROG Swift',
    description: 'Nombre del producto. Debe ser único.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Monitor gamer de alta gama con 360Hz',
    description: 'Descripción detallada del producto.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 499.99,
    description: 'Precio del producto en dólares. Debe ser un número positivo.',
  })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 15,
    description: 'Cantidad disponible en stock. Debe ser un número positivo.',
  })
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    example: 'https://cdn.com/asus-rog-swift.png',
    description: 'URL de la imagen del producto. Opcional.',
    required: false,
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    example: 'uuid-cat-monitor',
    description: 'ID de la categoría a la que pertenece el producto.',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
