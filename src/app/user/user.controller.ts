import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/newUser')
  async newUser(@Res() res, @Body() userDto: UserDto) {
    const user = await this.userService.registerUser(userDto);
    return res.status(HttpStatus.OK).json({
      response: user,
    });
  }

  @Get('/getAllUsers')
  async getAllUsers(@Res() res) {
    const user = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json({
      response: user,
    });
  }

  @Post('/updateUser')
  async updateUser(@Res() res, @Body() data: any) {
    const users = await this.userService.updateUser(data);
    return res.status(HttpStatus.OK).json({
      response: users,
    });
  }

  @Delete('/deleteUser')
  async deleteUser(@Res() res, @Body() data: any) {
    const users = await this.userService.deleteUser(data);
    return res.status(HttpStatus.OK).json({
      response: 'User deleted!',
    });
  }
}
