import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.productsService.getAll(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  /* @UseGuards(AuthGuard) */
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.delete(id);
  }

  @Post('seeder')
  seed(@Body() products: Partial<Product>[]) {
    return this.productsService.seed(products);
  }
}
