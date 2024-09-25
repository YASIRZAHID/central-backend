import { Controller, Post, Body, Get, Headers, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthorizerService } from './authorizer.service';
import { JwtAuthGuard } from './jwt-auth/jwt-auth.guard'; 

@Controller('auth')
export class AuthController {
  constructor(private authorizerService: AuthorizerService) {}

  @Post('signup')
  async signUp(@Body() body: { email: string, password: string, name: string }) {
    const { email, password, name } = body;
    return this.authorizerService.signUp(email, password, name);
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    return this.authorizerService.signIn(email, password);
  }

  @Get('verify-token')
  async verifyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];  // Extract the token from the 'Bearer <token>' format
    return this.authorizerService.verifyToken(token);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard to protect this route
  protectedRoute() {
    return { message: 'You have accessed a protected route!' };
  }
}

