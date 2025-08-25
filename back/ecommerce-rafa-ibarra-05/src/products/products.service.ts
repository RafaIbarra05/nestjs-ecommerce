import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}
  getAll(): Product[] {
    return this.productsRepo.findAll();
  }
  findById(id: number) {
    return this.productsRepo.findById(id);
  }

  create(data: Omit<Product, 'id'>) {
    return this.productsRepo.create(data);
  }

  update(id: number, data: Partial<Product>) {
    return this.productsRepo.update(id, data);
  }

  delete(id: number) {
    return this.productsRepo.delete(id);
  }
}
