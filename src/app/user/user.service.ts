import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Injectable()
export class UserService {
  jwtService: JwtService;
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

  async registerUser(userDto: UserDto) {
    const user = new this.userModel(userDto);
    return await user.save();
  }

  async login(email: string, password: string) {
    var user = await this.userModel.findOne({ email });
    console.log(user._id)
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    };

    const jwt = await this.jwtService?.signAsync({id: user._id});
    response.cookie(jwt, {httpOnly: true})
  }

  async getUsers() {
    return this.userModel.find();
  }

  async updateUser(data: any) {
    return this.userModel.findByIdAndUpdate(data.userId, data.userData, {
      new: true,
    });
  }

  async deleteUser(data: any) {
    return this.userModel.findByIdAndDelete(data.userId);
  }
}
