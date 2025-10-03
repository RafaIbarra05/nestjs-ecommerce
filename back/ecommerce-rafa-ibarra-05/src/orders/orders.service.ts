import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';
import { OrderResponseDto } from './dto/OrderResponseDto';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepository) {}

  private toResponseDto(order: Order): OrderResponseDto {
    return {
      id: order.id,
      date: order.date.toISOString(),
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      detail: {
        id: order.detail.id,
        price: Number(order.detail.price),
        products: order.detail.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          imgUrl: p.imgUrl,
        })),
      },
    };
  }

  async create(dto: CreateOrderDto): Promise<OrderResponseDto> {
    const created = await this.repo.addOrder(dto);
    const fullOrder = await this.repo.getOrder(created.id);
    return this.toResponseDto(fullOrder);
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    const order = await this.repo.getOrder(id);
    return this.toResponseDto(order);
  }
}
