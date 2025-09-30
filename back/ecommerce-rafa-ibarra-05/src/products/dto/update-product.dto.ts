import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Razer BlackWidow V4',
    description: 'Nombre del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Teclado mecánico gamer con switches ópticos',
    description: 'Descripción del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 129.99,
    description: 'Precio actualizado del producto en dólares (opcional).',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    example: 18,
    description: 'Stock actualizado del producto (opcional).',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiPropertyOptional({
    example: 'https://cdn.com/razer-blackwidow-v4.png',
    description: 'Nueva URL de la imagen del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiPropertyOptional({
    example: 'uuid-cat-keyboard',
    description: 'Nuevo ID de la categoría (opcional).',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
