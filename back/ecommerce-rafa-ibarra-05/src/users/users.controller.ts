import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '.././auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Lista paginada de usuarios',
    schema: {
      example: {
        data: [
          {
            id: 'uuid',
            name: 'Juan',
            email: 'juan@mail.com',
            address: 'Av. Siempre Viva 123',
            phone: '123456789',
            country: 'Argentina',
            city: 'Córdoba',
            isAdmin: false,
          },
        ],
        meta: { page: 1, limit: 5, total: 20 },
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
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado, requiere rol de Admin',
  })
  getAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    schema: {
      example: {
        id: 'uuid',
        name: 'Juan',
        email: 'juan@mail.com',
        address: 'Av. Siempre Viva 123',
        phone: '123456789',
        country: 'Argentina',
        city: 'Córdoba',
        isAdmin: false,
        orders: [{ id: 'uuid-order1', createdAt: '2025-09-19T12:00:00Z' }],
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
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente',
    schema: {
      example: {
        message: 'Usuario actualizado correctamente',
        data: {
          id: 'uuid',
          name: 'Nuevo nombre',
          email: 'nuevo@mail.com',
          address: 'Nueva dirección',
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
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = await this.service.update(id, data);
    return {
      message: 'Usuario actualizado correctamente',
      data: updatedUser,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado correctamente',
    schema: { example: { delete: true } },
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
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (JWT inválido o ausente)',
  })
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return { id: this.service.delete(id) };
  }
}
