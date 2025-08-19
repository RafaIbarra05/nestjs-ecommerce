import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({})
export class authController {
  constructor(private authService: AuthService) {}
  @Get('/auth')
  authController() {
    return this.authService.authService();
  }
}
