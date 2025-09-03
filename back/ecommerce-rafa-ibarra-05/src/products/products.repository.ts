import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
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

  // Seed para precargar productos
  async seedProducts(products: Partial<Product>[]) {
    const newProducts = this.repo.create(products);
    await this.repo.save(newProducts);
    return 'Productos agregados';
  }
}
