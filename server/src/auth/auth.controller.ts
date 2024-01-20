import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInRequest,
  ) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return {
      access_token: token,
    };
  }
}
