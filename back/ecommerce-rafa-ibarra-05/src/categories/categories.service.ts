import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly repo: CategoriesRepository) {}
  async addCategories(): Promise<string> {
    await this.repo.addCategories();
    return 'Categorías precargadas';
  }

  async getCategories() {
    return await this.repo.getCategories();
  }
}
