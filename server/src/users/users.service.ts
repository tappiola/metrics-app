import { Injectable } from '@nestjs/common';
import prisma from '../../prisma/prisma';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
}
