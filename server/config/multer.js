import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "portfolio_projects", // cloud folder name
      resource_type: "auto", // allows images, gifs, videos
      public_id: file.originalname.split(".")[0], // optional: name without extension
    };
  },
});

const upload = multer({ storage });

export default upload;
