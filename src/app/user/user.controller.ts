import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/newUser')
  @UsePipes(ValidationPipe)
  async newUser(@Res() res, @Body() userDto: UserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      userDto.password = await bcrypt.hash(userDto.password, salt);
      const user = await this.userService.registerUser(userDto);
      return res.status(HttpStatus.CREATED).json({
        response: user,
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('login')
  async login(
    @Res() res,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.userService.login(email, password);
      return res.status(HttpStatus.OK).json({
        response: user,
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/getAllUsers')
  async getAllUsers(@Res() res) {
    try {
      const user = await this.userService.getUsers();
      return res.status(HttpStatus.OK).json({
        response: user,
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/updateUser')
  async updateUser(@Res() res, @Body() data: any) {
    try {
      const users = await this.userService.updateUser(data);
      return res.status(HttpStatus.OK).json({
        response: users,
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/deleteUser')
  async deleteUser(@Res() res, @Body() data: any) {
    try {
      const users = await this.userService.deleteUser(data);
      return res.status(HttpStatus.OK).json({
        response: 'User deleted!',
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
