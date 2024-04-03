import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    // Check user credentials, generate and return JWT token
    const user = await this.authService.validatePassword(loginDTO?.username, loginDTO?.password);
    const accessToken = await this.authService.generateJWT(user);
    return { accessToken };
  }
} 