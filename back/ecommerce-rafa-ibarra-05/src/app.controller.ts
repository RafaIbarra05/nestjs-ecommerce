import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRootMessage() {
    return {
      message: '🚀 E-commerce API online',
      docs: '/api/docs',
    };
  }
}
