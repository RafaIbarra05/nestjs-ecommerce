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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  @ApiOkResponse({
    description: 'Lista paginada de productos',
    type: [Product],
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
  @ApiUnauthorizedResponse({
    description: 'No autorizado (JWT inválido o ausente)',
  })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.productsService.getAll(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Producto encontrado',
    type: Product,
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
  @ApiBadRequestResponse({
    description: 'Formato de ID inválido (UUID esperado)',
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Producto creado correctamente',
    type: Product,
    schema: {
      example: {
        id: 'uuid-new',
        name: 'Asus ROG Swift',
        description: 'High-end gaming monitor with 360Hz refresh rate',
        price: 499.99,
        stock: 20,
        imgUrl: 'https://cdn.com/asus-rog-swift.png',
        category: { id: 'uuid-cat-monitor', name: 'Monitores' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Datos inválidos o mal formato de ID' })
  @ApiForbiddenResponse({
    description: 'Acceso denegado, requiere rol de Admin',
  })
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @Roles(Role.Admin)
  @ApiOkResponse({
    description: 'Producto actualizado correctamente',
    type: Product,
    schema: {
      example: {
        id: 'uuid',
        name: 'Logitech G Pro X Superlight',
        description: 'Ultra-lightweight wireless gaming mouse with HERO sensor',
        price: 129.99,
        stock: 8,
        imgUrl: 'https://cdn.com/logitech-gpro-x-superlight.png',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Formato de ID inválido (UUID esperado)',
  })
  @ApiForbiddenResponse({
    description: 'Acceso denegado, requiere rol de Admin',
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.update(id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @ApiOkResponse({
    description: 'Producto eliminado correctamente',
    schema: { example: { deleted: true } },
  })
  @ApiBadRequestResponse({
    description: 'Formato de ID inválido (UUID esperado)',
  })
  @ApiForbiddenResponse({
    description: 'Acceso denegado, requiere rol de Admin',
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.delete(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Post('seeder')
  @ApiCreatedResponse({
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
