import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller({})
export class ProductsController {
  productsService: ProductsService;
  constructor(productsService: ProductsService) {
    this.productsService = productsService;
  }
  @Get('/products')
  getProducts() {
    return this.productsService.productsService();
  }
}
