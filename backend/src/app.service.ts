/*

Includes the required services/middlewares in order to process data either coming/outgoing to client side

* Generate JWT: Ensures the using JWT library a useable token is returned, which is then set inside the cookies of browser from frontend
* Validate Password: Ensures that the hashed password it de-coded and compared with the actual user's password, in order to make the user authentic

*/

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWT(user: any): Promise<string> {
    return this.jwtService.sign({ id: user?.id });
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}