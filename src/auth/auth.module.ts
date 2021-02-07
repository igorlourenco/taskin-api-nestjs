import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './shared/auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './shared/local.strategy';
import { JwtStrategy } from './shared/jwt.strategy';
import { jwt } from '../../constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
