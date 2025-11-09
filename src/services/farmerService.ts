import { Farmer } from "../models/Farmer";
import bcrypt from "bcryptjs";
import {
  generateCloudinaryPresignedUrl,
  uploadToCloudinary,
} from "../utils/cloudinaryUpload";

class FarmerService {
  static async register(body: any, files: any) {
    const { email, phone, password } = body;
    // construct location object bcuz body.location is flat object as we are sending form-data and not integrated with frontend directly
    const location ={
        address:body["location[address]"],
        city:body["location[city]"],
        state:body["location[state]"],
        zipCode:body["location[zipCode]"],
        country:body["location[country]"],
    }

    const exisitingFarmer = await Farmer.findOne({
      // atleast email or phone should match
      $or: [{ email }, { phone }],
    });
    if (exisitingFarmer)
      throw new Error("Farmer with this email or phone number already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    // ensure secure_url is in scope even if files.profileImage is not provided
    let secure_url: string | undefined;

    if (files?.profileImage) {
      const presignedURL = await generateCloudinaryPresignedUrl(body.folder);
      const { signature, timestamp, folder } = presignedURL;
      const payload = {
        file: files.profileImage,
        signature,
        timestamp,
        api_key: process.env.CLOUDINARY_API_KEY,
        folder,
      };
      const uploadImage = await uploadToCloudinary(
        files.profileImage,
        signature,
        timestamp,
        folder || ""
      );
      secure_url = uploadImage.secure_url;
    }
    const newFarmer = new Farmer({
      ...body,
      location,
      password: hashedPassword,
      profileImage: secure_url,
    });
    await newFarmer.save();
    return newFarmer;
  }
}

export { FarmerService };
