import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderResponseDto } from './dto/OrderResponseDto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente',
    schema: {
      example: {
        message: 'Orden creada exitosamente',
        orderId: 'uuid-order-123',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la orden (ejemplo: stock insuficiente)',
    schema: {
      example: {
        statusCode: 400,
        message: 'No hay stock suficiente para el producto X',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  async create(@Body() data: CreateOrderDto) {
    const order = await this.service.create(data);
    return {
      message: 'Orden creada exitosamente',
      orderId: order.id,
    };
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle de una orden',
    type: OrderResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Formato de ID inválido (UUID esperado)',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }
}
