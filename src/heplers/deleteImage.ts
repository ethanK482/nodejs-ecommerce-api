import { v2 as cloudinaryV2 } from "cloudinary";
import envConfig from "../utils/envConfig";
import { CloudinaryConfigOptions } from "../utils/upload";
const cloudinaryConfig: CloudinaryConfigOptions = {
    cloud_name: envConfig.getCloudinaryName,
    api_key: envConfig.getCloudinaryKey,
    api_secret: envConfig.getCloudinarySecret
};

// Configure Cloudinary
cloudinaryV2.config(cloudinaryConfig);
const deleteImages = (imagesPath: string[]) => {
    console.log(imagesPath);
    try {
        cloudinaryV2.api
            .delete_resources(imagesPath,
                { type: 'upload', resource_type: 'image' })
    }
    catch (error) {
        console.log(error)
    }

}
export default deleteImages;