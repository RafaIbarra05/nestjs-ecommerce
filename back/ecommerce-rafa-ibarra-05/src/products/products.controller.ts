import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller({})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('/products')
  findAll(): Product[] {
    return this.productsService.getAll();
  }
}
