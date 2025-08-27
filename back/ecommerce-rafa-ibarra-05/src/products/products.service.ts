import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo: ProductsRepository) {}
  getAll(page?: number, limit?: number) {
    const currentPage = page && page > 0 ? page : 1;
    const currentLimit = limit && limit > 0 ? limit : 5;

    return this.productsRepo.paginate(currentPage, currentLimit);
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
