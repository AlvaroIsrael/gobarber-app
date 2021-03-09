import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import AppError from '@shared/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const server = express();

server.use(cors());
server.use(express.json());
server.use(rateLimiter);
server.use(routes);
server.use(errors());

server.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message //'Internal server error.',
  });
});

server.listen(Number(process.env.PORT), () => {
  console.log(`🔥 Server running on port ${process.env.PORT}! 🔥`);
});
