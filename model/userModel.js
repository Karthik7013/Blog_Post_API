import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

const user = mongoose.model("user", userSchema);
export default user;
