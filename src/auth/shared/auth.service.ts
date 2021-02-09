import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    const passwordMatches = await bcrypt.compare(password, user.password);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (user && passwordMatches) {
      const { _id, name, email } = user;
      return { id: _id, name, email };
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
