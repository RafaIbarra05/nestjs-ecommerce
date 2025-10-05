import { ApiProperty } from '@nestjs/swagger';
import { ProductSummaryDto } from '../../orders/dto/OrderResponseDto';

class Meta {
  @ApiProperty({ example: 1, description: 'Número de la página actual' })
  page: number;

  @ApiProperty({ example: 15, description: 'Cantidad de elementos por página' })
  limit: number;

  @ApiProperty({ example: 12, description: 'Cantidad total de elementos' })
  total: number;

  @ApiProperty({
    example: false,
    description: 'Indica si existe una siguiente página',
  })
  hasNextPage: boolean;

  @ApiProperty({
    example: false,
    description: 'Indica si existe una página anterior',
  })
  hasPrevPage: boolean;
}

export class PaginatedProductsResponse {
  @ApiProperty({
    type: [ProductSummaryDto],
    description: 'Lista de productos correspondientes a la página solicitada',
  })
  data: ProductSummaryDto[];

  @ApiProperty({
    type: Meta,
    description: 'Información sobre la paginación actual',
  })
  meta: Meta;
}
