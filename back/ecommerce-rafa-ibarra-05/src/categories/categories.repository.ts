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
    const results = { insert: 0, skipped: 0, total: 0 };

    for (const element of Data) {
      const categoryElement = element.category;

      const exists = await this.categoriesReposiroty.findOne({
        where: { name: categoryElement },
      });

      if (exists) {
        results.skipped++;
      } else {
        const newCategory = this.categoriesReposiroty.create({
          name: categoryElement,
        });
        await this.categoriesReposiroty.save(newCategory);
        results.insert++;
      }
    }

    results.total = results.insert + results.skipped;
    return results;
  }
}
