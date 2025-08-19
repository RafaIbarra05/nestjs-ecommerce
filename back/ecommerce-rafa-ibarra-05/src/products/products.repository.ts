import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    // datos hardcodeados
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

  findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
