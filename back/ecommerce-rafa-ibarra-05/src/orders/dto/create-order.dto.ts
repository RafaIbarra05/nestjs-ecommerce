import { IsUUID, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1, {
    message: 'Debes incluir al menos un producto en la orden.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
