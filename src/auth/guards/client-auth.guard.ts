import { AuthGuard } from '@nestjs/passport';
export class ClientAuthGuard extends AuthGuard('local') {}
