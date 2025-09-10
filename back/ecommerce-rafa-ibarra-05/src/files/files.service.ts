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
    // Subir imagen a Cloudinary
    const uploadResult = await this.cloudinaryClient.uploader.upload(
      file.path,
      {
        folder: 'products',
      },
    );

    // Buscar producto en DB
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    // Actualizar campo imgUrl
    product.imgUrl = uploadResult.secure_url;
    await this.productsRepo.save(product);

    // Devolver producto actualizado
    return {
      message: 'Imagen actualizada correctamente',
      product,
    };
  }
}
