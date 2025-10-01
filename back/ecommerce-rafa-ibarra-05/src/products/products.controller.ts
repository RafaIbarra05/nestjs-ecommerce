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
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de productos',
    schema: {
      example: {
        data: [
          {
            id: 'uuid1',
            name: 'Placa de Video NVIDIA GeForce RTX 4070 Ti',
            description: 'GPU con 12GB GDDR6X para gaming y diseño 3D',
            price: 899.99,
            stock: 5,
            imgUrl: 'https://cdn.com/rtx4070.png',
            category: { id: 'uuid-cat1', name: 'Placas de Video' },
          },
          {
            id: 'uuid2',
            name: "Monitor LG UltraGear 27'' QHD 165Hz",
            description: 'Monitor gamer IPS 165Hz con 1ms de respuesta',
            price: 399.99,
            stock: 15,
            imgUrl: 'https://cdn.com/lg-monitor.png',
            category: { id: 'uuid-cat2', name: 'Monitores' },
          },
        ],
        meta: {
          page: 1,
          limit: 5,
          total: 20,
          hasNextPage: true,
          hasPrevPage: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.productsService.getAll(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Disco SSD Kingston NV2 1TB NVMe',
        description:
          'Unidad de estado sólido M.2 PCIe 4.0 NVMe con velocidad de lectura hasta 3500MB/s',
        price: 79.99,
        stock: 60,
        imgUrl: 'https://cdn.com/kingston-nv2-1tb.png',
        category: {
          id: '999e8400-e29b-41d4-a716-446655440000',
          name: 'Almacenamiento',
        },
      },
    },
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
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente',
    schema: {
      example: {
        name: 'Asus ROG Swift',
        description: 'High-end gaming monitor with 360Hz refresh rate',
        price: 499.99,
        stock: 20,
        categoryId: 'uuid-monitor-category',
        imgUrl: 'https://cdn.com/asus-rog-swift.png',
      },
    },
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
    status: 403,
    description: 'Acceso denegado, requiere rol de Admin',
  })
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente',
    schema: {
      example: {
        name: 'Logitech G Pro X Superlight',
        description: 'Ultra-lightweight wireless gaming mouse with HERO sensor',
        price: 129.99,
        stock: 8,
        imgUrl: 'https://cdn.com/logitech-gpro-x-superlight.png',
      },
    },
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
    status: 403,
    description: 'Acceso denegado, requiere rol de Admin',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.update(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente',
    schema: { example: { deleted: true } },
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
    status: 403,
    description: 'Acceso denegado, requiere rol de Admin',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.delete(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Post('seeder')
  @ApiResponse({
    status: 201,
    description: 'Productos cargados exitosamente por seeder',
    schema: {
      example: {
        inserted: 5,
        skipped: 2,
        total: 7,
      },
    },
  })
  seed() {
    return this.productsService.seed();
  }
}
