import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    subtitle: {
      type: String,
    },
    authorId: {
      type: String,
      required: true,
    },
    authorName: {
      required: true,
      type: String,
    },
    imgUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
    },
    category: {
      type: [],
      required: true,
    },
    comments: [
      {
        commenter: {
          id:String,
          avatarUrl:String,
          name: String,
          email: String,
        },
        comment: String,
        date: Date,
      }
    ],
  },
  { timestamps: true }
);
export default postSchema;
