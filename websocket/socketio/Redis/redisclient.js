"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
class RedisClient {
    //1st time - {id: 10, name: Ashan  ...}
    //2nd time - data will from cache -> ttl (time to live - 3600) -> Stale time 1hr
    static getClient() {
        if (!RedisClient.instance) {
            RedisClient.instance = new ioredis_1.Redis({
                host: process.env.REDIS_HOST || "127.0.0.1",
                port: Number(process.env.REDS_PORT) || 6379
            });
        } //If we do instance we can create
        return RedisClient.instance;
    }
    //Define our client logic
    //TTL - Expiry
    //Set cache - set a new cache 
    //get cache - user can access cache
    //delete cache - delete exipred caches
    static setExpirationTime(key_1, value_1) {
        return __awaiter(this, arguments, void 0, function* (key, value, expMode = "EX", time) {
            const client = RedisClient.getClient();
            yield client.set(key, value, "EX", time);
        });
    }
}
exports.default = RedisClient;
