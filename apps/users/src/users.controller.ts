import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService) {}

  @MessagePattern({cmd: 'create_user'})
  createUser(createUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({cmd: 'login'})
  login(loginDto) {
    return this.authService.signIn(loginDto.username, loginDto.password);
  }

  @MessagePattern({cmd: 'get_users'})
  getUsers() {
       return this.usersService.findAll();
  }
}
