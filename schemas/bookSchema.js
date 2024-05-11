import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    required: true,
    type: String,
    unique: true,
  },
  author: {
    required: true,
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 2,
  },
  reviews: [
    {
      message: {
        type: String,
      },
    },
  ],
  imgURL: {
    type: String,
    default: "",
  },
  year: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  downloadURL: {
    type: String,
  },
  category:{
    type:String,
    required:true
  }
});
export default bookSchema;
