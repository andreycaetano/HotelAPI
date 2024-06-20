import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('verifyToken')
  async verifyToken(@Request() req) {
    return this.authService.verifyToken(req)
  }
}
