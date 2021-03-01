import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis, { ClientOpts } from 'redis';

import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';

const redisClient = redis.createClient(cacheConfig.config.redis as ClientOpts);

redisClient.on('error', () => {
  throw new AppError('Redis internal error, contact the developer.', 500);
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}
