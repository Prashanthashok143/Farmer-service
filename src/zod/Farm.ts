import { z } from "zod";


export const FarmValidator = z.object({
    farmerId: z.string(),
    farmerName:z.string().min(3,"Farmer name must be at least 3 characters long"),
    cropType:z.string,
    areaInAcres: z.number().positive("Area must be a positive number"),
    soilType: z.enum(["Loamy","Sandy","Clayey","Silty","Peaty","Chalky"]),
    irrigationType: z.enum(["Drip","Sprinkler","Surface","Subsurface"]),
    location: z.object({
        village:z.string(),
        mandal:z.string(),
        district:z.string(),
        state:z.string(),
        country:z.string(),
        pincode:z.string().length(6,"Pincode must be 6 characters long")
    })
})