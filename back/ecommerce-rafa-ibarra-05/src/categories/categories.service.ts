import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { SeederResult } from 'src/common/types/seeder-result';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}
  async addCategories(): Promise<SeederResult> {
    return await this.repo.addCategories();
  }

  async getCategories(): Promise<Category[]> {
    return await this.repo.getCategories();
  }
}
