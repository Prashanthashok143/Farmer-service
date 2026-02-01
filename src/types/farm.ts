export interface Farm {
    farmerId: string;
    farmerName:string;
    phone:string;
    cropType: string;
    areaInAcres: number;
    soilType: "Loamy" | "Sandy" | "Clayey" | "Silty" | "Peaty" | "Chalky";
    irrigationType: "Drip" | "Sprinkler" | "Surface" | "Subsurface";
    location:{
        village:string;
        mandal:string;
        district:string;
        state:string;
        country:string;
        pincode:string;
    }
    createdAt?:Date;
    updatedAt?:Date;
}