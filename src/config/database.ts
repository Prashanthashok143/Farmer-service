import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

// MONGO_URI -- tells our app  where MongoDB lives
// connectMongo fun connects once at startup;
export const connectMongo = async (): Promise<void>=>{
    try{
        if (!MONGO_URI) {
            console.error("MONGO_URI environment variable is not set.");
            // shuts app down if DB isn't reachable or config missing
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    }catch(error) {
        console.log("MongoDB connection error" ,(error as Error).message);
        // shuts app down if DB isn't reachable (better than running half-broken)
        process.exit(1);
    }
}