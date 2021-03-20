import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'src/db/entities/UserEntity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async createUser(
    @Body() userData: Partial<UserEntity>,
  ): Promise<Partial<UserEntity>> {
    const newUser = await this.usersService.createUser(userData);
    const { password, ...user } = newUser;
    return user;
  }

  @Post('login')
  async login(
    @Body() userData: Partial<UserEntity>,
  ): Promise<Partial<UserEntity>> {
    const user = await this.usersService.login(userData);
    const { password, ...userInfo } = user;
    return userInfo;
  }
}
