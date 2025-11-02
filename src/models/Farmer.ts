import { Schema , model } from 'mongoose';
import { FarmerProfile } from '../types/farmer';

const  FarmerSchema = new Schema<FarmerProfile>({
    name:{
        type: String,
        required:true
    } ,
    phone:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        address: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    profileImage:String,
    farmImages:String,
    bio:String ,
},
{ timestamps: true}
);


export const Farmer = model<FarmerProfile>('Farmer',FarmerSchema);