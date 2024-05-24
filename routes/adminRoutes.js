import { Router } from "express";
import isAuthenticate from "../middlewares/auth.js";
import {
  createPost,
  getPostbyId,
  updatePost,
  deletePost,
  getAllPosts,
  getAllPostsById,
} from "../controller/postController.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import post from "../model/postModel.js";

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

adminRouter.post("/createpost", isAuthenticate, createPost);
adminRouter.get("/post/all", getAllPosts);
adminRouter.get("/post/:id", isAuthenticate, getPostbyId);
adminRouter.get("/post/all/:id", isAuthenticate, getAllPostsById);
adminRouter.put("/updatepost/:id", isAuthenticate, updatePost);
adminRouter.delete("/deletepost/:id", isAuthenticate, deletePost);

// dashboard routes

adminRouter.get("/dashboard/:id", isAuthenticate, async (req, res) => {
  let userId = req.params.id;
  try {
    let allPosts = await post.find({ authorId: userId });
    let p = {}
    allPosts.map((e) => {
        e.category.map((e) => {
            p[e] = p[e] ? p[e] + 1 : 1
        })
    });
    return res.status(200).json(p);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
});
export default adminRouter;
