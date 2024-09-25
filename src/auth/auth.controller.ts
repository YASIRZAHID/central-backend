import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthorizerService } from './authorizer.service';

@Controller('auth')
export class AuthController {
  constructor(private authorizerService: AuthorizerService) {}

  @Post('signup')
  async signUp(@Body() body) {
    const { email, password, name } = body;
    return this.authorizerService.signUp(email, password, name);
  }

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authorizerService.signIn(email, password);
  }

  @Get('verify-token')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];  // Extract the token from the 'Bearer <token>' format
    return this.authorizerService.verifyToken(token);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard) // Apply the JWT Auth Guard
  protectedRoute() {
    return { message: 'You have accessed a protected route!' };
  }
}
