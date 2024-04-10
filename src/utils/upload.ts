import { v2 as cloudinaryV2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

interface CloudinaryConfigOptions {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  [key: string]: string; // Allow other string properties
}
// Define the cloudinaryConfig object with type CloudinaryConfigOptions
const cloudinaryConfig: CloudinaryConfigOptions = {
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_KEY || "",
  api_secret: process.env.CLOUDINARY_SECRET || "",
};

// Configure Cloudinary
cloudinaryV2.config(cloudinaryConfig);

// Create Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: (req, file) => {
    return {
      folder: "Han",
    };
  }, // Chuyển đổi thành kiểu Options
});

// Create multer upload
const uploadCloud = multer({ storage });

export = uploadCloud;
