import * as Redis from 'redis';

const redisClient:Redis.RedisClientType = Redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
    }
});

export default redisClient
  