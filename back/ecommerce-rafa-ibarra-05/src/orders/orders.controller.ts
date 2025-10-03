import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderResponseDto } from './dto/OrderResponseDto';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Orden creada exitosamente',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos en la orden (ejemplo: stock insuficiente)',
    schema: {
      example: {
        statusCode: 400,
        message: 'No hay stock suficiente para el producto X',
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado (JWT inválido o ausente)',
  })
  async create(@Body() data: CreateOrderDto): Promise<OrderResponseDto> {
    return await this.service.create(data);
  }
  @Get(':id')
  @ApiOkResponse({
    description: 'Detalle de una orden',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Formato de ID inválido (UUID esperado)',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (uuid is expected)',
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado (JWT inválido o ausente)',
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }
}
