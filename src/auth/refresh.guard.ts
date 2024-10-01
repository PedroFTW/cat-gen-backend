import { UserTokenService } from './user-token.service';
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userTokenService: UserTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //TODO: repeated on both guards, check possibility to extract it into a helper class
    const request: Request = context.switchToHttp().getRequest();
    const refresh_token = request.body.refresh_token;

    const userToken = await this.userTokenService.findOneByToken(refresh_token);

    if (!userToken) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync(userToken.refresh_token, {
        secret: jwtConstants.refresh_secret,
      });
    } catch (error) {
      this.userTokenService.deleteByToken(userToken.refresh_token);
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
