import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderDetail } from './order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({
    example: 'uuid-order-123',
    description: 'ID único de la orden',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2025-09-19T12:00:00Z',
    description: 'Fecha de creación de la orden',
  })
  @CreateDateColumn()
  date: Date;

  @ApiProperty({
    type: () => OrderDetail,
    description: 'Detalle asociado a la orden (productos y precio total)',
  })
  @OneToOne(() => OrderDetail, (detail) => detail.order, { cascade: true })
  @JoinColumn({ name: 'order_detail_id' })
  detail: OrderDetail;

  @ApiProperty({
    type: () => User,
    description: 'Usuario que realizó la orden',
  })
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
