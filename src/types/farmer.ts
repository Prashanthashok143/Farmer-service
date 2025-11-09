export interface FarmerProfile {
    name: string;
    phone: string;
    email?: string;
    password: string;
    location?: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;    
    };
    profileImage?: string; 
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}