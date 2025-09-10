import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ValidateImagePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('El archivo es requerido');
    }

    // 1. Validar tamaño (200kb = 200 * 1024 bytes)
    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('La imagen no debe superar los 200kb');
    }

    // 2. Validar formato
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExt = extname(file.originalname).toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      throw new BadRequestException(
        `Formato no permitido. Solo se aceptan: ${validExtensions.join(', ')}`,
      );
    }

    return file;
  }
}
