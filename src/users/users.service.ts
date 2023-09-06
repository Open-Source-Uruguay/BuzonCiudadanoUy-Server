import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository:
    Repository<UserEntity>
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(createUserDto.email);
    if (userExists) throw new BadRequestException("Correo no disponible");
    createUserDto.password = await hash(createUserDto.password, 10);
    let user = this.usersRepository.create(createUserDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(loginUserDto: LoginUserDto) {
    const userExists = await this.usersRepository.createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: loginUserDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException("Las cedenciales son incorrectas");
    const match = await compare(loginUserDto.password, userExists.password);
    if (!match) throw new BadRequestException("Las cedenciales son incorrectas");
    delete userExists.password;
    delete userExists.roles;
    return userExists;
  }

  async accessToken(user: UserEntity) { 
    const token = jwt.sign(
      { id: user.id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRATION}
    );
    return token;
  }

  async refreshToken(user: UserEntity) {
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email},
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: process.env.REFRESH_TOKEN_EXPIRATION}
    );
    return refreshToken;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");

    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.password) user.password = await hash(updateUserDto.password, 10);

    let result = await this.usersRepository.save(user);
    delete result.roles;
    delete result.password;
    return result;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException("Usuario no encontrado");
    await this.usersRepository.remove(user);
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
