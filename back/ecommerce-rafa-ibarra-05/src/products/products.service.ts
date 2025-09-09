import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepo: ProductsRepository,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  getAll(page = 1, limit = 5) {
    return this.productsRepo.paginate(page, limit);
  }

  findById(id: string) {
    return this.productsRepo.findById(id);
  }

  async create(data: CreateProductDto) {
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

  update(id: string, data: Partial<Product>) {
    return this.productsRepo.update(id, data);
  }

  delete(id: string) {
    return this.productsRepo.delete(id);
  }

  // Seed desde archivo externo
  async seed(products: Partial<Product>[]) {
    return this.productsRepo.seedProducts(products);
  }
}
