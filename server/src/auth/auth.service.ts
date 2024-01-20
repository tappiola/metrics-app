import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const doesPasswordMatch = await compare(password, user.passwordHash);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uuid };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
