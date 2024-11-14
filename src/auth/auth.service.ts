import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(body: loginDto) {
    const { email, password } = body;
    const user = await this.validate(email, password);

    return {
      user,
      accessToken: await this.signToken(user.id, user.email, user.name ?? ''),
    };
  }

  async validate(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }

  async signToken(userId: string, email: string, name: string) {
    const payload = {
      sub: userId,
      email,
      name,
    };
    const secret = this.config.get('JWT_SECRET');
    return await this.jwt.signAsync(payload, {
      expiresIn: this.config.get('TOKEN_EXPIRE_TIME'),
      secret: secret,
    });
  }
}
