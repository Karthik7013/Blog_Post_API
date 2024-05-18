import { Router } from "express";
import {
  forgotPassword,
  updatePassword,
  userLogin,
  userRegister,
  userProfile,
} from "../controller/userController.js";
import { saveBook } from "../controller/bookController.js";
import isAuthenticate from "../middlewares/auth.js";

const userRouter = Router()
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/rest/password",isAuthenticate, updatePassword);
userRouter.post("/forgot/password", forgotPassword);

userRouter.get("/profile", isAuthenticate, userProfile);
userRouter.post("/save/:id", isAuthenticate, saveBook);
userRouter.put("/profile/update/:id", isAuthenticate, (req, res) => {
  res.send({ message: "updated profile" });
});

export default userRouter;
