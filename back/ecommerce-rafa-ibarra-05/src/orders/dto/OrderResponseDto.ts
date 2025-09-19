import { ApiProperty } from '@nestjs/swagger';

class UserSummaryDto {
  @ApiProperty({
    example: 'uuid-user-1',
    description: 'ID del usuario que hizo la orden',
  })
  id: string;

  @ApiProperty({ example: 'Rafa', description: 'Nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'rafa@mail.com', description: 'Correo del usuario' })
  email: string;
}

class ProductSummaryDto {
  @ApiProperty({ example: 'uuid-prod-123', description: 'ID del producto' })
  id: string;

  @ApiProperty({
    example: 'Zapatillas Nike Air',
    description: 'Nombre del producto',
  })
  name: string;

  @ApiProperty({ example: 99.99, description: 'Precio unitario del producto' })
  price: number;

  @ApiProperty({
    example: 'https://cdn.com/zapatillas.png',
    description: 'Imagen del producto',
  })
  imgUrl: string;
}

class OrderDetailDto {
  @ApiProperty({
    example: 'uuid-detail-1',
    description: 'ID del detalle de la orden',
  })
  id: string;

  @ApiProperty({
    example: 199.98,
    description: 'Precio total del detalle (suma de productos * cantidad)',
  })
  price: number;

  @ApiProperty({
    type: [ProductSummaryDto],
    description: 'Productos incluidos en la orden',
  })
  products: ProductSummaryDto[];
}

export class OrderResponseDto {
  @ApiProperty({ example: 'uuid-order-1', description: 'ID de la orden' })
  id: string;

  @ApiProperty({
    example: '2025-09-19T12:00:00Z',
    description: 'Fecha de creación de la orden',
  })
  date: string;

  @ApiProperty({
    type: () => UserSummaryDto,
    description: 'Usuario que realizó la orden',
  })
  user: UserSummaryDto;

  @ApiProperty({
    type: () => OrderDetailDto,
    description: 'Detalle de la orden con productos',
  })
  detail: OrderDetailDto;
}
