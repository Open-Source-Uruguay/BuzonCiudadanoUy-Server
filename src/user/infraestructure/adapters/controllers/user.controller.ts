import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/application/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) { }
  
  @Post('/')
  signup(@Body() user: CreateUserDto) {
    return this.userService.signup(user);
  }
}
