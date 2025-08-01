import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
      //  const cloudName = process.env.CLOUDINARY_NAME
      // const apiKey = process.env.CLOUDINARY_API_KEY
      // const apiSecret = process.env.CLOUDINARY_SECRET_KEY
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    console.log("Cloudinary connected Successfully");
  } catch (error) {
    console.log("Cloudinary connection Failed!!", error.message);
  }
};

export default connectCloudinary;
