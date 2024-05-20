import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    profile: {
      location: {
        type: String,
      },
      imgURL: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    saved: [],
  },
  { timestamps: true }
);
export default userSchema;