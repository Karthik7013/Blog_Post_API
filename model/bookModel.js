import mongoose from "mongoose";
import bookSchema from "../schemas/bookSchema.js";
const book = mongoose.model('book',bookSchema)
export default book;