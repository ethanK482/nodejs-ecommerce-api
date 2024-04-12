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
  cloud_name:"dxryr0txi",
  api_key: "997824516269142",
  api_secret: "F4Lmw1vIKKWP1Gyc1xym1wZ5Z84"
};

// Configure Cloudinary
cloudinaryV2.config(cloudinaryConfig);

// Create Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: (req, file) => {
    return {
      folder: "han_shop",
    };
  },
});

// Create multer upload
const uploadCloud = multer({ storage });

export default uploadCloud;
