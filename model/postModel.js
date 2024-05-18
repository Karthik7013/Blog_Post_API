import mongoose from "mongoose";
import postSchema from "../schemas/postSchema.js";
const post = mongoose.model('post',postSchema)
export default post;