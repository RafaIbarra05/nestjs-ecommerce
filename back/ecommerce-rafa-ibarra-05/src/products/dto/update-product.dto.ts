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
    example: 'Zapatillas Nike Air MAX',
    description: 'Nombre del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Versión mejorada del modelo clásico',
    description: 'Descripción del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 120.5,
    description: 'Precio actualizado del producto en dólares (opcional).',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({
    example: 15,
    description: 'Stock actualizado del producto (opcional).',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @ApiPropertyOptional({
    example: 'https://cdn.com/nikeairmax.png',
    description: 'Nueva URL de la imagen del producto (opcional).',
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiPropertyOptional({
    example: 'uuid-cat-456',
    description: 'Nuevo ID de la categoría (opcional).',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
