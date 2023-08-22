import { Controller, Get, Post, Headers, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/application/services/auth.service';
import { AuthenticateDto } from '../dtos/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(
    readonly authService: AuthService
  ) { }

  @Post('/')
  authenticate(@Body() auth: AuthenticateDto) {
    return this.authService.authenticate(auth);
  }

  @Get()
  logout() { }
}
