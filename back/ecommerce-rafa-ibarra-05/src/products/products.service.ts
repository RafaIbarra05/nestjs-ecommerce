import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeederResult } from 'src/common/types/seeder-result';
import { PaginationResult } from 'src/common/types/pagination-result';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepo: ProductsRepository,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getAll(page = 1, limit = 5): Promise<PaginationResult<Product>> {
    return this.productsRepo.paginate(page, limit);
  }

  findById(id: string): Promise<Product | null> {
    return this.productsRepo.findById(id);
  }

  async create(data: CreateProductDto): Promise<Product> {
    const category = await this.categoryRepo.findOneBy({ id: data.categoryId });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    const productData: Partial<Product> = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      imgUrl: data.imgUrl,
      category,
    };

    return this.productsRepo.create(productData);
  }

  update(id: string, data: Partial<Product>): Promise<Product> {
    return this.productsRepo.update(id, data);
  }

  delete(id: string): Promise<{ delete: boolean }> {
    return this.productsRepo.delete(id);
  }

  async seed(): Promise<SeederResult> {
    return this.productsRepo.seedProducts();
  }
}
