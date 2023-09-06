import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/user-roles.enum';
import { AuthorizeGuard } from 'src/common/guards/authorization.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';
import { RefreshUser } from 'src/common/decorators/refresh-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticationGuard)
  @Get('/profile')
  async getProfile(@CurrentUser() currentUser: UserEntity): Promise<UserEntity> {
    return currentUser;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<{user: UserEntity}> {
    return {user:await this.usersService.create(createUserDto)};
  }

  @Post('/login')
  async signin(@Body() loginUserDto: LoginUserDto): Promise<{
    user: UserEntity,
    accessToken: string,
    refreshToken: string
  }> {
    const user = await this.usersService.signin(loginUserDto);
    const accessToken = await this.usersService.accessToken(user);
    const refreshToken = await this.usersService.refreshToken(user);
    return {
      user,
      accessToken,
      refreshToken
    }
  }

  @UseGuards(RefreshGuard)
  @Get('/refresh')
  async refresh(@RefreshUser() refreshUser: UserEntity) {
    const user = refreshUser;
    const accessToken = await this.usersService.accessToken(user);
    const refreshToken = await this.usersService.refreshToken(user);

    return {
      user,
      accessToken,
      refreshToken
    }
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() currentUser: UserEntity) {
    if (id.toString() != currentUser.id.toString()) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return await this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() currentUser: UserEntity) {
    if (id.toString() != currentUser.id.toString()) {
      throw new NotFoundException("Usuario no encontrado");
    }
    return await this.usersService.remove(+id);
  }
}
