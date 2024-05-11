import { Router } from "express";
import isAuthenticate from "../middlewares/auth.js";
import {
  addBook,
  deleteBook,
  updateBook,
  imgUpload,
} from "../controller/bookController.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "draw2w3fa",
  api_key: "494568288123568",
  api_secret: "Qxym64Bg05ZROSSBcBsFd49SCes",
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "png", // file format
    public_id: (req, file) => "sample-image", // file name
  },
});

const parser = multer({ storage: storage });

const adminRouter = Router();

adminRouter.post("/addbook", isAuthenticate, addBook);
adminRouter.delete("/deletebook", isAuthenticate, deleteBook);
adminRouter.put("/updatebook/:id", isAuthenticate, updateBook);
// adminRouter.post('/upload',parser.single('image'),imgUpload)
export default adminRouter;
