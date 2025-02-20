import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";
import dotenv from "dotenv";
import { Readable } from "stream";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileBuffer, originalname) => {
    try {
        if (!fileBuffer) return null;

        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "luxora-images",
                    public_id: originalname.split(".")[0],
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            Readable.from(fileBuffer).pipe(stream);
        });
    } catch (error) {
        throw new ApiError("Failed to upload to Cloudinary");
    }
};

export { uploadOnCloudinary };
