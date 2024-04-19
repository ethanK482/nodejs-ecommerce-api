import { v2 as cloudinaryV2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import envConfig from "./envConfig";
import { ALLOW_FORMATS, FOLDER_NAME, maxFileSize } from "./constants";

dotenv.config();
export interface CloudinaryConfigOptions {
  cloud_name: string;
  api_key: string;
  api_secret: string;
  [key: string]: string; // Allow other string properties
}
// Define the cloudinaryConfig object with type CloudinaryConfigOptions
const cloudinaryConfig: CloudinaryConfigOptions = {
  cloud_name: envConfig.getCloudinaryName,
  api_key: envConfig.getCloudinaryKey,
  api_secret: envConfig.getCloudinarySecret
};

// Configure Cloudinary
cloudinaryV2.config(cloudinaryConfig);

// Create Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: (req, file) => {
    return {
      allowedFormats: ALLOW_FORMATS,
      folder: FOLDER_NAME,
    };
  },
});

// Create multer upload
const uploadCloud = multer({ storage, limits: { fileSize: maxFileSize } });

export default uploadCloud;
