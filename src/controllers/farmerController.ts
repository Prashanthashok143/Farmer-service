import { Request , Response } from "express";
import {FarmerService} from "../services/farmerService";
import asyncHandler from "express-async-handler";

class FarmerController {
  // Take all properties of Express’s Request type and add a files property which can be an object or null
    static register = asyncHandler(async (req: Request & { files?: { [fieldname: string]: any } | null }, res: Response) => {
        console.log("req",req.body)
        try {
          const farmer = await FarmerService.register(req.body,req.files);
          res
            .status(201)
            .json({ message: "Farmer registered successfully", farmer });
        } catch (error: any) {
          console.error("Farmer registration failed:", error);
          res
            .status(500)
            .json({
              message: "Error registering farmer",
              error: error.message,
            });
        }  
    });
}
export { FarmerController }