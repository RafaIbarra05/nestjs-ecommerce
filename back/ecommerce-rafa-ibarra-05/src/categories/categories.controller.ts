import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('seeder')
  @ApiResponse({
    status: 201,
    description: 'Categorías precargadas correctamente',
    schema: {
      example: {
        inserted: 3,
        skipped: 1,
        total: 4,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Error en el formato de datos enviados',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al cargar categorías',
  })
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listado de categorías',
    schema: {
      example: [
        {
          id: 'uuid-cat1',
          name: 'Calzado',
        },
        {
          id: 'uuid-cat2',
          name: 'Ropa',
        },
      ],
    },
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
