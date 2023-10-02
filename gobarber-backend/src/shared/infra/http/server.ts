import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
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
server.use(
  cors({
    origin: process.env.APP_WEB_URL || '',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    credentials: true,
  }),
);
server.use(express.json());
server.use(rateLimiter);
server.use(routes);
server.use(errors());

server.use((err: Error, _: Request, response: Response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

server.listen(Number(process.env.PORT), () => {
  // eslint-disable-next-line no-console
  console.log(`🔥 Server running on port ${process.env.PORT}! 🔥`);
});
