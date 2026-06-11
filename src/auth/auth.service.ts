import { Injectable, UnauthorizedException } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(body: LoginDto) {
    if (!body) {
      throw new UnauthorizedException('Body não informado')
    }

    const { email, password } = body

    if (email !== 'admin@naporta.com' || password !== '123456') {
      throw new UnauthorizedException('Credenciais inválidas')
    }

    const payload = {
      sub: 1,
      email,
    }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
