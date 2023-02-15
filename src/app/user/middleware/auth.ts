import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  jwtService: JwtService;
  configService: ConfigService
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key'];
    if (!token ) {
        throw new HttpException('Please provide token', HttpStatus.BAD_REQUEST);
    };
    
    console.log('Request...');
    next();
  }
};
