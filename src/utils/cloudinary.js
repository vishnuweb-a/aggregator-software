import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config.js';

cloudinary.config({
  cloud_name: config.cloudnaryName,
  api_key: config.cloudnaryApiKey,
  api_secret: config.cloudnaryApiSecret,
});

export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'profile_pictures',
        quality: 'auto', // Compress image
        fetch_format: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};
