import { Request , Response } from "express";
import FarmerService from "../services/farmerService";
import asyncHandler from "express-async-handler";

class FarmerController {
  // Take all properties of Express’s Request type and add a files property which can be an object or null
    public async register (req: Request & { files?: { [fieldname: string]: any } | null }, res: Response){
        console.log("req",req.body)
        try {
          await  FarmerService.register(req.body, req.files);
          res
            .status(201)
            .json({ message: "Farmer registered successfully"});
        } catch (error: any) {
          console.error("Farmer registration failed:", error);
          res
            .status(500)
            .json({
              message: "Error registering farmer",
              error: error.message,
            });
        }  
      }
  


    public async farmDetails(req: Request, res: Response): Promise<void>{
        try {
          await FarmerService.Farmdetails(req.body);
          res.status(201).json({message:"Farm details saved successfully"})
        }
        catch (error) {
          res.status(500).json({ message: "Error fetching farm details", error });
        }
    }
    
}
export default new FarmerController