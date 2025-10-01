import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from 'src/config/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [FilesController],
  providers: [FilesService, CloudinaryProvider],
  exports: [FilesService],
})
export class FilesModule {}
