import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ValidateImagePipe } from './pipes/validate-image.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('uploadImage/:id')
  @ApiOperation({ summary: 'Subir imagen de producto a Cloudinary' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'UUID del producto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen subida correctamente',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Placa de Video NVIDIA GeForce RTX 4070 Ti',
        imgUrl:
          'https://res.cloudinary.com/tu-cloud/image/upload/v123456789/rtx4070ti.png',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(ValidateImagePipe) file: Express.Multer.File,
  ) {
    return this.filesService.uploadProductImage(id, file);
  }
}
