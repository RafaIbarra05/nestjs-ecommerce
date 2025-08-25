import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAll() {
    return this.productsService.getAll(); // 200 OK
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: Omit<Product, 'id'>) {
    return { id: this.productsService.create(data) };
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Product>,
  ) {
    return { id: this.productsService.update(id, data) };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return { id: this.productsService.delete(id) };
  }
}
