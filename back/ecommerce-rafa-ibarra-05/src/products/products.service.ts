import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductsService {
  productsService() {
    return 'Obtener todos los productos';
  }
}
