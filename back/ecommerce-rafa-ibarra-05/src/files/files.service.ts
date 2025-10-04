import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Readable } from 'stream';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient: typeof cloudinary,
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
  ) {}

  async uploadProductImage(id: string, file: Express.Multer.File) {
    if (!file) throw new Error('Archivo no recibido');

    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product)
      throw new NotFoundException(`Producto con id ${id} no encontrado`);

    if (!file || !file.buffer) {
      throw new Error('Archivo no válido o buffer vacío');
    }

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const upload = this.cloudinaryClient.uploader.upload_stream(
          { folder: 'products' },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined,
          ) => {
            if (error) {
              return reject(
                new Error(
                  error.message || 'Error al subir la imagen a Cloudinary',
                ),
              );
            }

            if (!result) {
              return reject(new Error('No se recibió respuesta de Cloudinary'));
            }

            resolve(result);
          },
        );

        try {
          if (!file.buffer || !file.buffer.length) {
            return reject(new Error('El archivo no contiene datos válidos'));
          }
          const readable = Readable.from(file.buffer);
          readable.pipe(upload);
        } catch (err) {
          return reject(err instanceof Error ? err : new Error(String(err)));
        }
      },
    );

    product.imgUrl = uploadResult.secure_url;
    await this.productsRepo.save(product);

    return {
      message: 'Imagen actualizada correctamente',
      product,
    };
  }
}
