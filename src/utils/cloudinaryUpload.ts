import cloudinary from "../config/cloudinary";
import { Request, Response } from "express";


export const generateCloudinaryPresignedUrl = async (req:Request , res: Response) => {
  try {
    const folder = req.query.folder as string;

    //  Creating a timeStamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generating signature 
    const paramsToSign = {
      timestamp,
      folder,
      // resource_type: "auto",
    }
    const signature = cloudinary.utils.api_sign_request(paramsToSign , process.env.CLOUDINARY_API_SECRET as string);
    res.status(200).json({
      success: true,
      data:{
        signature,
        timestamp,
        api_key:process.env.CLOUDINARY_API_KEY,
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        folder
      }
    })
  }
  catch (error) {
    console.log("Error generating Cloudinary presigned URL :" , error);
    res.status(500).json({
      success: false,
      message: "Error generating Cloudinary presigned URL",
    })
  }
}
