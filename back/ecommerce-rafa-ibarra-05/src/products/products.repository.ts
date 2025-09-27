import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSeed } from 'src/common/types/product-seed.type';
import Data from '../utils/seeder.json';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRepository(Category)
    private readonly CategoriesRepository: Repository<Category>,
  ) {}

  async paginate(page: number, limit: number) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['category'],
    });

    return {
      page,
      limit,
      total,
      items,
    };
  }

  async findById(id: string) {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async create(data: Partial<Product>) {
    const newProduct = this.repo.create(data);
    const saved = await this.repo.save(newProduct);
    return saved.id;
  }

  async update(id: string, data: Partial<Product>) {
    await this.repo.update(id, data);
    return id;
  }

  async delete(id: string) {
    await this.repo.delete(id);
    return id;
  }

  async seedProducts() {
    const results = { insert: 0, skipped: 0, total: 0 };
    const products: ProductSeed[] = Data as ProductSeed[];

    for (const product of products) {
      const exists = await this.repo.findOne({ where: { name: product.name } });
      if (exists) {
        results.skipped++;
        continue;
      }
      const category = await this.CategoriesRepository.findOne({
        where: { name: product.category },
      });
      if (!category) {
        results.skipped++;
        continue;
      }
      const newProduct = this.repo.create({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imgUrl: product.imgUrl,
        category,
      });
      await this.repo.save(newProduct);
      results.insert++;
    }

    results.total = results.insert + results.skipped;
    return results;
  }
}
