import { IsUUID, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
