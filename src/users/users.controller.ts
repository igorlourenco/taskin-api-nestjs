import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './shared/user.service';
import { User } from './shared/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.register(user);
  }
}
