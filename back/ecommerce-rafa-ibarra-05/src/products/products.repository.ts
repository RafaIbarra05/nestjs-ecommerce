import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSeed } from 'src/common/types/product-seed.type';
import Data from '../utils/seeder.json';
import { Category } from 'src/categories/entities/category.entity';
import { SeederResult } from 'src/common/types/seeder-result';
import { PaginationResult } from 'src/common/types/pagination-result';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    @InjectRepository(Category)
    private readonly CategoriesRepository: Repository<Category>,
  ) {}

  async paginate(
    page: number,
    limit: number,
  ): Promise<PaginationResult<Product>> {
    const currentPage = page > 0 ? page : 1;
    const currentLimit = limit > 0 ? limit : 5;

    const [items, total] = await this.repo.findAndCount({
      skip: (currentPage - 1) * currentLimit,
      take: currentLimit,
      relations: ['category'],
    });

    return {
      data: items,
      meta: {
        page: currentPage,
        limit: currentLimit,
        total,
        hasNextPage: currentPage * currentLimit < total,
        hasPrevPage: currentPage > 1,
      },
    };
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async create(data: Partial<Product>): Promise<Product> {
    const newProduct = this.repo.create(data);
    return await this.repo.save(newProduct);
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    if (data.categoryId) {
      const category = await this.CategoriesRepository.findOne({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new NotFoundException(
          `Categoría con id ${data.categoryId} no encontrada`,
        );
      }

      product.category = category;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categoryId: _, ...rest } = data;

    this.repo.merge(product, rest);

    return await this.repo.save(product);
  }

  async delete(id: string): Promise<{ delete: boolean }> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return { delete: true };
  }

  async seedProducts(): Promise<SeederResult> {
    const results = { inserted: 0, skipped: 0, total: 0 };
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
      results.inserted++;
    }

    results.total = await this.repo.count();
    return results;
  }
}
