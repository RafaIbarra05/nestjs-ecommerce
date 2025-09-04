import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { OrderDetail } from '../../orders/order-detail.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;
  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'text',
    default: 'https://cdn-icons-png.flaticon.com/512/1375/1375106.png',
  })
  imgUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrderDetail, (detail) => detail.products)
  orderDetails: OrderDetail[];
}
