import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module'; 

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
  ],
})
export class AppModule {}