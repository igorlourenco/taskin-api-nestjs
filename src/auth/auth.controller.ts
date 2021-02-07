import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { AuthService } from './shared/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any) {
    return this.authService.login(request.user);
  }
}
