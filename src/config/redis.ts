// importing the function createClient from redis package;
import { createClient } from "redis"
// this function is used to create and manage a connection to a Redis server;

// create a redis client instance
// think of it as a bridge between your application and the Redis server;
const redisClient = createClient({
  socket: {
    host: "127.0.0.1", // use IPv4  or  Redis host
    port: 6379         // or  Redis port
  }
});


// event listener for any errors from  Redis.
// if there is an error while connecting or during operations, 
// this will log the error message to the console , instead 
//  of crashing the app;
redisClient.on("error",(err)=>{
    console.log("Redis connection error:",err);
});

// connectRedis fun to call in main file and connect method is used to establish the connection;
export const connectRedis = async (): Promise<void> =>{
    try {
        await redisClient.connect();
        console.log("Connected to Redis Successfully");
    } catch (error) {
        console.log("Redis connection failed",(error as Error).message);
        process.exit(1);
    }
}

export default redisClient;