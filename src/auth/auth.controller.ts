import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login (@Body() loginDto:LoginDto){
    return this.authService.login(loginDto);
  }
  @Post("register")
  async register (@Body() registerDto:RegisterDto){
    return this.authService.register(registerDto);
  }
}
