import {Redis, RedisOptions} from "ioredis"


type RedisSetimeOptions = "PX" | "NX" | "EX"
class RedisClient {
    private static instance: Redis //Singleton

    //1st time - {id: 10, name: Ashan  ...}
    //2nd time - data will from cache -> ttl (time to live - 3600) -> Stale time 1hr
    
    public static getClient() {
        if(!RedisClient.instance){
                RedisClient.instance = new Redis({
                    host: process.env.REDIS_HOST || "127.0.0.1",
                    port: Number(process.env.REDS_PORT) || 6379
                })
        } //If we do instance we can create
        return RedisClient.instance 
    }

    //Define our client logic
    //TTL - Expiry
    //Set cache - set a new cache 
    //get cache - user can access cache
    //delete cache - delete exipred caches
    public static async setExpirationTime(key: string, value: string, expMode: RedisSetimeOptions = "EX", time: number ){
        const client = RedisClient.getClient()
        await client.set(key, value, "EX", time)
    }


}

export default RedisClient
