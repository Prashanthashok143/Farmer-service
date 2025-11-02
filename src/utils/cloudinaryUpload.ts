import cloudinary from "../config/cloudinary";
// import streamifier from "streamifier";
export const uploadToCloudinary = (fileBuffer: Buffer, folder: string) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    // streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
