import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExceptionsModule } from './exceptions/exceptions.module';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_TOKEN }),
    ExceptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
