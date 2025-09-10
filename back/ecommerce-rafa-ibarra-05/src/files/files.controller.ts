import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ValidateImagePipe } from './pipes/validate-image.pipe';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File,
  ) {
    return this.filesService.uploadProductImage(id, file);
  }
}
