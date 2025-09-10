import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryProvider } from 'src/config/cloudinary.provider';

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryProvider],
  exports: [FilesService],
})
export class FilesModule {}
