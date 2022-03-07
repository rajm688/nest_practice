import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTO/auth.credentials.dto';
import { userRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './DTO/jwt,paylod.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userRepository)
    private userRepository: userRepository,
    private jwtService: JwtService,
  ) {}
  async signup(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }
  async signin(
    authCredentialDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JwtPayLoad = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('invalid username or password');
    }
  }
}
