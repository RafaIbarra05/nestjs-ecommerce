import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as Data from '../utils/seeder.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesReposiroty: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoriesReposiroty.find();
  }
  async addCategories() {
    for (const element of Data) {
      const exists = await this.categoriesReposiroty.findOne({
        where: { name: element.category },
      });
      if (!exists) {
        const newCategory = this.categoriesReposiroty.create({
          name: element.category,
        });
        await this.categoriesReposiroty.save(newCategory);
      }
    }
    return 'Categorias agregadas';
  }
}
