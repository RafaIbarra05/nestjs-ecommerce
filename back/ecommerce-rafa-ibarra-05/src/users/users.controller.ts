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
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '.././auth/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  /* @UseGuards(AuthGuard) */
  @Get()
  getAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findAll(
      page ? parseInt(page, 10) : undefined,
      limit ? parseInt(limit, 10) : undefined,
    );
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateUserDto) {
    const user = await this.service.create(data);
    return { id: user.id };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<User>) {
    return { id: this.service.update(id, data) };
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id: this.service.delete(id) };
  }
}
