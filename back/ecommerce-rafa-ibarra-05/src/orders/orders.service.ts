import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepository) {}

  create(dto: CreateOrderDto) {
    return this.repo.addOrder(dto);
  }

  findOne(id: string) {
    return this.repo.getOrder(id);
  }
}
