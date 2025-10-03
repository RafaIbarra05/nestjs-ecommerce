import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient: typeof cloudinary,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async uploadProductImage(id: string, file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryClient.uploader.upload(
      file.path,
      {
        folder: 'products',
      },
    );

    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    product.imgUrl = uploadResult.secure_url;
    await this.productsRepo.save(product);

    return {
      message: 'Imagen actualizada correctamente',
      product,
    };
  }
}
