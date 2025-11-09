import { Schema , model } from 'mongoose';
import { FarmerProfile } from '../types/farmer';

const  FarmerSchema = new Schema<FarmerProfile>({
    name:{
        type: String,
        required:true,
        trim:true, // Removes extra spaces before and after
    } ,
    phone:{
        type: String,
        required:true,
        match:/^[0-9]{10}$/,
    },
    email:{
        type:String,
        unique:true, // creates a unique index in the db , means no two farmers can have same email
        required:true,
        lowercase:true, // automically converts to lowercase
        trim:true, 
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    location:{
        address: String,
        city: String,
        state: String,
        zipCode: String,
        country: {type:String, default:"India"},
    },
    profileImage:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        maxLength:300,
    },
},
{ timestamps: true}
);


export const Farmer = model<FarmerProfile>('Farmer',FarmerSchema);