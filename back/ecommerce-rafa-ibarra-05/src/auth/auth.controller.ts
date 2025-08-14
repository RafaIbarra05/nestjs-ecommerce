import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller({})
export class authController {
  authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  @Get('/auth')
  authController() {
    return this.authService.authService();
  }
}
