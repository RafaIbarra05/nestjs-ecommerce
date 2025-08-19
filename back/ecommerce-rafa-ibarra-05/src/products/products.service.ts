import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}
  getAll(): Product[] {
    return this.productsRepo.findAll();
  }
}
