import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    summary: 'Verifica el estado del servidor',
    description:
      'Endpoint raíz que confirma que la API está en funcionamiento y muestra la ruta hacia la documentación.',
  })
  @ApiOkResponse({
    description: 'La API está activa y responde correctamente.',
    schema: {
      example: {
        message: 'E-commerce API online',
        docs: '/api/docs',
      },
    },
  })
  getRootMessage() {
    return {
      message: 'E-commerce API online',
      docs: '/api/docs',
    };
  }
}
