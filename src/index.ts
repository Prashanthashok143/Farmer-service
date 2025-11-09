import express ,{ type Application } from "express" ;
import dotenv from "dotenv";
dotenv.config(); // to access env variables globally for all modules
import fileUpload from "express-fileupload";
import { connectMongo } from  "./config/database";
import  { connectRedis }  from "./config/redis";
import  { farmerRoutes } from "./routes/farmerRoutes";


const app: Application = express();
// Middleware :  used to handle file uploads ,“Extract the files from the form and attach them to req.files". if doesnt exist , req.files will be undefined ;
app.use(fileUpload()); 
// Middleware :  used to parse JSON bodies , if doesnt exist , req.body will be undefined;;
app.use(express.json());
// routes
app.use("/farmers",farmerRoutes)


const startServer = async ()=>{
    await connectMongo();
    await connectRedis();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT,()=>{
        console.log("Sever running on PORT",PORT)
    })
}

startServer();


