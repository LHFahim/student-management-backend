import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'libraries/serializer/serializer.decorator';
import { Routes } from 'src/common/constant/routes';
import { APIVersions } from 'src/common/enum/api-versions.enum';
import { ControllersEnum } from 'src/common/enum/controllers.enum';
import { AuthService } from './auth.service';
import {
  CreateAuthDto,
  LoginDto,
  RegisterByEmailDto,
  UpdateAuthDto,
} from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Serialize()
@Controller({ path: ControllersEnum.Auth, version: APIVersions.V1 })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(Routes[ControllersEnum.Auth].login)
  login(@Body() body: LoginDto, @Request() request: any) {
    return this.authService.login(body, request);
  }

  @Post(Routes[ControllersEnum.Auth].registerByEmail)
  registerByEmail(@Body() body: RegisterByEmailDto) {
    return this.authService.registerByEmail(body);
  }
}
