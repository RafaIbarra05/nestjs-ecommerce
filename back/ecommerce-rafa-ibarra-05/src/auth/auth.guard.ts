import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    // Debe comenzar con "Basic "
    if (!authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Authorization header must start with Basic',
      );
    }

    // Sacamos la parte después de "Basic "
    const credentials = authHeader.slice(6).trim();

    // Debe contener un email y un password separados por ":"
    const [email, password] = credentials.split(':');

    if (!email || !password) {
      throw new UnauthorizedException(
        'Authorization header must include email and password',
      );
    }

    // Por ahora no validamos si son correctos
    return true;
  }
}
