import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserTokenService } from './user-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserToken, UserTokenSchema } from './user-token.schema';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
  ],
  providers: [AuthService, UserTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
