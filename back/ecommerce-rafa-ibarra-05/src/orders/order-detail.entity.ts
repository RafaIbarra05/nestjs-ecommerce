import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '.././products/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('order_details')
export class OrderDetail {
  @ApiProperty({
    example: 'uuid-detail-123',
    description: 'ID único del detalle de la orden',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 199.98,
    description: 'Precio total de los productos incluidos en la orden',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    type: () => Order,
    description: 'Orden a la que pertenece este detalle',
  })
  @OneToOne(() => Order, (order) => order.detail)
  order: Order;

  @ApiProperty({
    type: () => [Product],
    description: 'Lista de productos incluidos en el detalle de la orden',
    example: [
      {
        id: 'uuid-prod-4090',
        name: 'NVIDIA GeForce RTX 4090',
        description:
          'Tarjeta gráfica de alto rendimiento con 24 GB GDDR6X ideal para gaming 4K y renderizado 3D.',
        price: 1799.99,
        stock: 8,
        imgUrl: 'https://cdn.com/nvidia-rtx4090.png',
      },
    ],
  })
  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable()
  products: Product[];
}
