import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderDetail } from '../../orders/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({
    example: 'uuid-prod-123',
    description: 'ID único del producto',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'NVIDIA GeForce RTX 4090',
    description: 'Nombre del producto. Debe ser único.',
    maxLength: 50,
  })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    example:
      'Tarjeta gráfica de última generación con 24 GB GDDR6X ideal para gaming y diseño 3D.',
    description: 'Descripción detallada del producto',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    example: 99.99,
    description: 'Precio en dólares. Debe ser un número positivo',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    example: 20,
    description: 'Cantidad disponible en stock',
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    example: 'https://cdn.com/nvidia-rtx4090.png',
    description: 'URL de la imagen del producto de hardware.',
    default: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png',
  })
  @Column({
    type: 'text',
    default: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png',
  })
  imgUrl: string;

  @ApiProperty({
    type: () => Category,
    description: 'Categoría a la que pertenece el producto',
  })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({
    type: () => [OrderDetail],
    description: 'Detalles de órdenes que incluyen este producto',
  })
  @ManyToMany(() => OrderDetail, (detail) => detail.products)
  orderDetails: OrderDetail[];
}
