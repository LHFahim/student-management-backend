// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     return request.isAuthenticated();
//     // const token = request.headers;
//     // console.log(
//     //   '🚀 ~ file: auth.guard.ts:20 ~ JwtAuthGuard ~ canActivate ~ token:',
//     //   token,
//     // );
//     // // const token = '1';
//     // if (!token) {
//     //   throw new UnauthorizedException();
//     // }
//     // try {
//     //   const payload = await this.jwtService.verifyAsync(token, {
//     //     secret: await this.configService.get('JWT_SECRET'),
//     //   });
//     //   // 💡 We're assigning the payload to the request object here
//     //   // so that we can access it in our route handlers
//     //   request.user = payload;
//     // } catch {
//     //   throw new UnauthorizedException('Unauthorized user');
//     // }
//     // return true;
//   }
// }
