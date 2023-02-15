import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './app/user/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Nestjs'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    }),
    
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
