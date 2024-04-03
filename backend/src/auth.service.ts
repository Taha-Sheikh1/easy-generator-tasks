import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupDTO } from './signup.dto'; 
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  userService: any;
  constructor(private jwtService: JwtService) {}

  async generateJWT(user: any): Promise<string> {
    return this.jwtService.sign({ id: user?.id });
  }

  async validatePassword(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);  
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt?.compare(password, user?.password); 
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;  
  }

  async signup(signupDTO: SignupDTO): Promise<any> {
    // Hash the password before saving it to the database ( ensures password authenticity )
    const hashedPassword = await bcrypt.hash(signupDTO?.password, 10);
     
    const newUser = await this.userService.create({
      username: signupDTO?.username,
      email: signupDTO?.email,
      password: hashedPassword,
    });

    return newUser;
  }
} 