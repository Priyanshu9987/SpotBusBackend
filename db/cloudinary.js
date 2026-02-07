import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary Connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

  const cloudinaryFile = async (localFilePath) => { try {
    if (!localFilePath) { throw new Error("No file path provided for Cloudinary upload");

      } 
      const uploadResult = await cloudinary.uploader.upload(localFilePath, { folder: "spotbus_uploads"   // optional: organize uploads 
      }); 
      return uploadResult.secure_url; 
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error.message);
        throw error;   // bubble up instead of returning null
      } };

export default cloudinaryFile;

