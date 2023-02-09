import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://Satyaveer1994:Satyaveer123@cluster0.pn1nk.mongodb.net/Nestjs'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
