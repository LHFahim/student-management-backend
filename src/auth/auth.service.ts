import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SerializeService } from 'libraries/serializer/serialize';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto, LoginDto, UpdateAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService extends SerializeService<UserEntity> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super(UserEntity);
  }

  async login(body: LoginDto) {
    console.log('hi', body);

    const payload = { sub: '1', username: 'fahim' };
    const token = await this.jwtService.signAsync(payload);
    console.log(
      '🚀 ~ file: auth.service.ts:25 ~ AuthService ~ login ~ token:',
      token,
    );
    return {
      access_token: token,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.userService.findOne(username);
    console.log('🚀 ~ validateUser', user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
