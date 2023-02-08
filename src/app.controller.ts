import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {


  constructor(private authService: AuthService) { }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {

    return this.authService.login(request.user);

  }
}
