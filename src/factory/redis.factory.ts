import * as redis from 'redis';
const redisClinet= redis.createClient()
redisClinet.connect();

 redisClinet.on('connect', () => console.log('Redis Clinet Connected'));
 redisClinet.on('error', (err) => console.log('Redis Client Connection Error', err));

 //set and get redis data
export async function redisSetGet(key: string, cb: any) {
    return new Promise(async (resolve, reject) => {
      const redisData = await redisClinet.get(key);
      if (redisData != null) resolve(JSON.parse(redisData));
      const newDATA = await cb();
      await redisClinet.setEx(key,3600,JSON.stringify(newDATA));
      resolve(newDATA);
    });
  }