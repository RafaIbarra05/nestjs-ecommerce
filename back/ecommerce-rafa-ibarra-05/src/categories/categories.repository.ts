import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import Data from '../utils/seeder.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return this.categoriesRepository.find();
  }

  async addCategories() {
    const results = { insert: 0, skipped: 0, total: 0 };

    const uniqueCategories: Set<string> = new Set();

    for (const product of Data) {
      uniqueCategories.add(product.category);
    }

    const categoriesArray: string[] = [...uniqueCategories];

    for (const category of categoriesArray) {
      const exists = await this.categoriesRepository.findOne({
        where: { name: category },
      });

      if (exists) {
        results.skipped++;
      } else {
        const newCategory = this.categoriesRepository.create({
          name: category,
        });
        await this.categoriesRepository.save(newCategory);
        results.insert++;
      }
    }

    results.total = results.insert + results.skipped;
    return results;
  }
}
