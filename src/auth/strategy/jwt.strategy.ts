// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log(
      '🚀 ~ file: jwt.strategy.ts:22 ~ JwtStrategy ~ validate ~ payload:',
      payload,
    );
    // const user = await this.authService.validateUser(
    //   payload.username,
    //   payload.password,
    // );
    // console.log(
    //   '🚀 ~ file: jwt.strategy.ts:27 ~ JwtStrategy ~ validate ~ user:',
    //   user,
    // );
    // if (!user) {
    //   throw new UnauthorizedException('Unauthorized user');
    // }

    // user.lastActive = new Date();
    // await user.save();

    // return user;
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
