import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
