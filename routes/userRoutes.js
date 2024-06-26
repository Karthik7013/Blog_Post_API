import { Router } from "express";
import {
  forgotPassword,
  updatePassword,
  userLogin,
  userRegister,
  userProfile,
} from "../controller/userController.js";
import { savePost, getSavedPosts } from "../controller/postController.js";
import isAuthenticate from "../middlewares/auth.js";
import user from "../model/userModel.js";
import post from "../model/postModel.js";

const userRouter = Router();
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/rest/password", isAuthenticate, updatePassword);
userRouter.post("/forgot/password", forgotPassword);

userRouter.get("/profile", isAuthenticate, userProfile);
userRouter.post("/save/:id", isAuthenticate, savePost);
userRouter.get("/all/savedpost", isAuthenticate, getSavedPosts);

userRouter.post("/comment/:id", isAuthenticate, async (req, res) => {
  const postId = req.params.id;
  const commentBody = req.body;

  const foundPost = await post.findOne({ _id: postId });
  foundPost.comments.push(commentBody);
  await foundPost.save()
  res.send(foundPost);
});

userRouter.put("/profile/update/:id", isAuthenticate, (req, res) => {
  res.send({ message: "updated profile" });
});

userRouter.put("/profile/dark/", isAuthenticate, async (req, res) => {
  try {
    const id = req.user.id;
    const found_user = await user.findById(id);
    if (!found_user) {
      res.status(400).json({ message: "user not found" });
    }
    found_user.dark = !found_user.dark;
    await found_user.save();
    return res.status(200).json({ message: found_user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
});

export default userRouter;
