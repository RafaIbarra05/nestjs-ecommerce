import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Cepillo Dental Pro',
      description: 'Cerdas suaves, mango ergonómico',
      price: 5499,
      stock: true,
      imgUrl: 'https://picsum.photos/seed/cepillo/400/300',
    },
    {
      id: 2,
      name: 'Hilo Dental Mint',
      description: 'Sabor menta, 50m',
      price: 2499,
      stock: true,
      imgUrl: 'https://picsum.photos/seed/hilo/400/300',
    },
    {
      id: 3,
      name: 'Enjuague Bucal 250ml',
      description: 'Antiséptico, sin alcohol',
      price: 3899,
      stock: false,
      imgUrl: 'https://picsum.photos/seed/enjuague/400/300',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  paginate(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const items = this.products.slice(start, end);

    return {
      page,
      limit,
      total: this.products.length,
      data: items,
    };
  }

  findById(id: number): Product {
    const found = this.products.find((p) => p.id === id);
    if (!found) throw new NotFoundException('Product not found');
    return found;
  }

  create(data: Omit<Product, 'id'>): number {
    const id = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
    const newProduct: Product = { id, ...data };
    this.products.push(newProduct);
    return id;
  }

  update(id: number, data: Partial<Product>): number {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    this.products[index] = { ...this.products[index], ...data };
    return id;
  }

  delete(id: number): number {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    this.products.splice(index, 1);
    return id;
  }
}
