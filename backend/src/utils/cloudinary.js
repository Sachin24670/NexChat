import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer from Multer's memory storage.
 * @param {string} folder - The Cloudinary folder to upload into.
 * @returns {Promise<object>} - The Cloudinary upload result.
 */
export const uploadToCloudinary = (fileBuffer, folder = "nexchat/profiles") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Delete an image from Cloudinary by its public_id.
 * @param {string} publicId - The public_id of the image to delete.
 * @returns {Promise<object>} - The Cloudinary deletion result.
 */
export const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

/**
 * Extract the public_id from a Cloudinary URL.
 * e.g. "https://res.cloudinary.com/demo/image/upload/v1234/nexchat/profiles/abc123.jpg"
 *   => "nexchat/profiles/abc123"
 */
export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/upload/");
  if (parts.length < 2) return null;
  // Remove the version prefix (v1234/) and file extension
  const afterUpload = parts[1].replace(/^v\d+\//, "");
  const publicId = afterUpload.replace(/\.[^/.]+$/, "");
  return publicId;
};

export default cloudinary;
