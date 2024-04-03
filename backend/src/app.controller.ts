/*

API Routes:

Login: Password, Username *required, ( POST )
SignUp: Email, Username, Password *required, ( POST )

*/

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { SignupDTO } from './signup.dto'; 

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    // Check user credentials, generate and return JWT token ( in order to ensure that the loggedin user is authentic)
    const user = await this.authService.validatePassword(loginDTO?.username, loginDTO?.password);
    const accessToken = await this.authService.generateJWT(user);
    return { accessToken };
  }

  @Post('signup') 
  async signup(@Body() signupDTO: SignupDTO): Promise<{ message: string }> {  
    await this.authService.signup(signupDTO);
    return { message: 'User account created successfully!' };
  }
}
