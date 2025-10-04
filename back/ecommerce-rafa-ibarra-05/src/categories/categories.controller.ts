import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('seeder')
  @ApiCreatedResponse({
    description: 'Categorías precargadas correctamente',
    schema: {
      example: {
        inserted: 3,
        skipped: 1,
        total: 4,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error en el formato de datos enviados',
    schema: {
      example: {
        statusCode: 400,
        message: 'Formato inválido en el payload',
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'No autorizado (JWT inválido o ausente)',
  })
  @ApiForbiddenResponse({
    description: 'Acceso denegado, requiere rol de Admin',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error interno al cargar categorías',
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  @ApiOkResponse({
    description: 'Listado de categorías',
    type: [Category],
    schema: {
      example: [
        { id: 'uuid-cat1', name: 'Calzado' },
        { id: 'uuid-cat2', name: 'Ropa' },
        { id: 'uuid-cat3', name: 'Accesorios' },
      ],
    },
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
