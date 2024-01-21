import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import prisma from '../../prisma/prisma';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const doesPasswordMatch = await compare(password, user.passwordHash);

    if (!doesPasswordMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.uuid };
    return await this.jwtService.signAsync(payload);
  }
}
