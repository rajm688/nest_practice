import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { userRepository } from './users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'ganesha',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([userRepository]),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
