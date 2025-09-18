import { Role } from '../roles.enum';

export interface JwtPayload {
  sub: string; // ID del usuario
  email: string;
  role: Role; // 👈 único rol, tipado con enum
  iat?: number; // opcional: issued at
  exp?: number; // opcional: expiration
}
