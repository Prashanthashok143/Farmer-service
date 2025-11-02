import { Farmer } from "../models/Farmer";
import bcrypt from "bcryptjs";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

class FarmerService {

    static async register(body:any,files:any) {
        console.log("files",files)
        const {email ,phone,password} = body;

        const exisitingFarmer = await Farmer.findOne({$or:[{email},{phone}]})
        if(exisitingFarmer) throw new  Error('Farmer with this email or phone number already exists');
         
        const hashedPassword = await bcrypt.hash(password,10);

        let profileImageUrl: string | undefined;
        let farmImageUrls: string[]  = [];
         if (files?.profileImage) {
      const result: any = await uploadToCloudinary(files.profileImage.data, "farmers/profileImages");
      console.log("result",result.secure_url)
      profileImageUrl = result.secure_url;
    }
        
        const newFarmer = new Farmer({
            ...body,
            password: hashedPassword,
            profileImage: profileImageUrl,
            // farmImages: farmImageUrls,
        });
        console.log("newFarmer",newFarmer)
        await newFarmer.save();
        return newFarmer;

    }
}

export { FarmerService }