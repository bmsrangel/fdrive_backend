import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.save(userData);
  }

  async login(userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: {
        email: userData.email,
      },
    });
    if (user && user.password == userData.password) {
      return user;
    } else {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
