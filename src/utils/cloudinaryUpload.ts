import cloudinary from "../config/cloudinary";
import FormData from "form-data";
import axios from "axios";

export interface CloudinaryPresignData {
  signature: string;
  timestamp: number;
  api_key?: string | undefined;
  cloud_name?: string | undefined;
  folder?: string | undefined;
}

/**
 * Pure function that generates presign data for Cloudinary.
 * Can be imported and used anywhere without an Express Response.
 */
export const generateCloudinaryPresignedUrl = (folder?: string): CloudinaryPresignData => {
  // Creating a timeStamp
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Build params to sign; only include folder when provided
  const paramsToSign: any = { timestamp };
  if (folder) paramsToSign.folder = folder;

  // Generating signature
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return {
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  };
};


// controller used to upload image to cloudinary as we are not integrated with frontend directly
export const uploadToCloudinary=async(file:any,signature:string,timeStamp:number,folder:string)=>{
  try {
    const formData = new FormData();
    formData.append("file",file.data,{
      filename:file.name,
      contentType:file.mimetype,
    });
    formData.append("api_key",process.env.CLOUDINARY_API_KEY as string);
    formData.append("signature",signature);
    formData.append("timestamp",timeStamp.toString())
    formData.append("folder",folder)
    const response = await axios.post("https://api.cloudinary.com/v1_1/telanagana-farmers/auto/upload",formData,{
      headers: formData.getHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Cloudinary upload failed")
  }
}
