import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SerializeService } from 'libraries/serializer/serialize';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterByEmailDto } from './dto/auth.dto';

@Injectable()
export class AuthService extends SerializeService<UserEntity> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super(UserEntity);
  }

  async login(body: LoginDto, request: any) {
    const payload = { id: request.user.id, email: request.user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async registerByEmail(body: RegisterByEmailDto): Promise<UserDto> {
    const userExists = await this.userService.findUserByEmail(body.email);
    if (userExists)
      throw new BadRequestException(`User ${body.email} already exists`);

    body.password = await this.getHashedPassword(body.password);

    const user = await this.userService.createUser({
      ...body,
    });

    return this.toJSON(user, UserDto);
  }

  public async getHashedPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
