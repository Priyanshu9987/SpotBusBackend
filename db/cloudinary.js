import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary Connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Cloudinary Statement
const cloudinaryFile = async (localFilePath) => {
  try {
      if (!localFilePath) 
        return null;

        const uploadResult = await cloudinary.uploader.upload(localFilePath);
        return uploadResult.secure_url; 

  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    return null;
  }
};

export default cloudinaryFile;