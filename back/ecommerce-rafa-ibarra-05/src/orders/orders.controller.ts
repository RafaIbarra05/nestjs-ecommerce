import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  async create(@Body() data: CreateOrderDto) {
    const order = await this.service.create(data);
    return {
      message: 'Orden creada exitosamente',
      orderId: order.id,
    };
  }
  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }
}
