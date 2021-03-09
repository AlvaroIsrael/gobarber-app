import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Missing JWT token.', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', StatusCodes.UNAUTHORIZED);
  }
}

export default ensureAuthenticated;
