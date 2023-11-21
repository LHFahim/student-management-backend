import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config/env.validation';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, validate }), ConfigModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
