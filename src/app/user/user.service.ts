import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserInterface } from './interface/user.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

  async registerUser(userDto: UserDto) {
    const user = new this.userModel(userDto);
    return await user.save();
  }

  async login(email: string, password: string) {
    const user = this.userModel.findOne({ email });
    console.log(user)
   //  if (!user) {
   //    return 'invalid credentials';
   //  }

   //  if (!await bcrypt.compare(password, (await user).password)) {
   //    return 'invalid crendentials';
   //  }

    return user;
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
