import { UserTokenService } from './user-token.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshGuard } from './refresh.guard';
import { AuthneticatedUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.schema';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userTokenService: UserTokenService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  refreshToken(@Body() refreshTokenDto: Record<string, any>) {
    return this.authService.refreshTokens(refreshTokenDto.refresh_token);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@AuthneticatedUser() user: User) {
    this.userTokenService.deleteByUser(user);
  }

  @Get('ping')
  ping() {
    return true;
  }
}
