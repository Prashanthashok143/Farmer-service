import mongoose from "mongoose";
import { Farm } from "../types/farm";

const FarmSchema = new mongoose.Schema<Farm>(
  {
    farmerId: { type: String, required: true },
    farmerName: { type: String, required: true },
    phone: { type: String, required: true },
    cropType: { type: String, required: true },
    areaInAcres: { type: Number, required: true },
    soilType: {
      type: String,
      enum: ["Loamy", "Sandy", "Clayey", "Silty", "Peaty", "Chalky"],
      required: true,
    },
    irrigationType: {
      type: String,
      enum: ["Drip", "Sprinkler", "Surface", "Subsurface"],
      required: true,
    },
    location: {
      village: { type: String, required: true },
      mandal: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);


export const FarmModel = mongoose.model<Farm>("FarmDetails",FarmSchema);