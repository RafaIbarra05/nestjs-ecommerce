import { IsUUID, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDto {
  @ApiProperty({
    example: 'uuid-prod-123',
    description: 'ID único del producto que se incluye en la orden.',
  })
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    example: 'uuid-user-456',
    description: 'ID único del usuario que realiza la orden.',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden.',
    type: [ProductDto],
    example: [{ id: 'uuid-prod-123' }, { id: 'uuid-prod-456' }],
  })
  @IsArray()
  @ArrayMinSize(1, {
    message: 'Debes incluir al menos un producto en la orden.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
