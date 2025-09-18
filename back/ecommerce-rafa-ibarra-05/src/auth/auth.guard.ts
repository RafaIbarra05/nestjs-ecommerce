import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    // Debe comenzar con "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header must start with Bearer',
      );
    }

    // Extraer token
    const token = authHeader.split(' ')[1];

    try {
      // Verificar token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
      // Adjuntar el payload del token al request
      request.user = decoded;

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
