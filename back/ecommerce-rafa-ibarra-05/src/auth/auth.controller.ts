import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() data: LoginUserDto) {
    return this.authService.signin(data.email, data.password);
  }
  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }
}
