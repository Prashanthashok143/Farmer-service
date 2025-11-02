import express ,{ type Application , type Request , type Response } from "express" ;
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { connectMongo } from  "./config/database";
import  { connectRedis }  from "./config/redis";
import  { farmerRoutes } from "./routes/farmerRoutes";


const app: Application = express();

dotenv.config(); // to access env variables
app.use(fileUpload()); 

console.log(process.env.MONGO_URI);

// Middleware : parse json;
app.use(express.json());
// routes
app.use("/farmers",farmerRoutes)


const startServer = async ()=>{
    await connectMongo();
    await connectRedis();

    const PORT = 5000;

    app.listen(PORT,()=>{
        console.log("Sever running on PORT",PORT)
    })
}

startServer();


