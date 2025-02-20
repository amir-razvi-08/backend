import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        const response = await cloudinary.uploader
            .upload_stream({ resource_type: "auto", timeout: 120000 }, (error, result) => {
                if (error) throw new ApiError(499, "Cloudinary upload failed");
                return result;
            })
            .end(fileBuffer);

        return response;
    } catch (error) {
        throw new ApiError(499, "Failed to upload to Cloudinary");
    }
};

export { uploadOnCloudinary };
