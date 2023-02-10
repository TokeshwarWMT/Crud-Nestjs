import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './app/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Nestjs',
  {useNewUrlParser: true},
  ), 
  JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
