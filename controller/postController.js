import post from "../model/postModel.js";
import user from "../model/userModel.js";

// @desc     add post
// @route    /admin/addpost
// @access   admin
const createPost = async (req, res) => {
  try {
    let { id } = req.user;
    let { title, subtitle, imgUrl, authorName, description, category } =
      req.body;

    let userFound = await user.findOne({ _id: id });
    if (userFound) {
      let newPost = await post.create({
        title,
        subtitle,
        authorId: id,
        authorName,
        imgUrl,
        description,
        category,
      });
      res
        .status(201)
        .json({ message: "Post added successfully", post: newPost });
    } else {
      res.send({ error: { message: "Dont have access to add Post" } });
    }
  } catch (error) {
    res.status(500).json({ error: { message: error?.errorResponse?.errmsg } });
  }
};

// @desc     update post
// @route    /admin/updatebook/:id
// @access   admin
const updatePost = async (req, res) => {
  res.send("updatebook");
};

// @desc     delete post
// @route    /admin/deletepost/:id
// @access   admin
const deletePost = async (req, res) => {
  const postId = req.params?.id;
  post
    .findOneAndDelete({ _id: postId })
    .then((docs) => {
      if (!docs) {
        res.status(404).json({ message: "Post Not Found!" });
      } else {
        res.status(200).json({ message: "Post Deleted", post: docs });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "An error occurred", error: err });
    });
};

// @desc     get postbyId
// @route    /book/:id
// @access   admin/user
const getPostbyId = async (req, res) => {
  try {
    let postId = req.params.id;
    const postFound = await post.findOne({ _id: postId });
    if (!postFound) {
      res.status(404).json({ message: "no post found" });
    } else {
      res.status(200).json({ post: postFound });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};

// @desc     get all posts
// @route    /book/:id
// @access   admin/user
const getAllPosts = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    let category = req.query.category;

    if (limit && page) {
      // let range = 0 - 9
      const cursor = post.find().skip(0).limit(9);

      const documents = await cursor.toArray();
      // let allPosts = await post.find({});
      res.status(200).json(documents);
    } else {
      let allPosts = await post.find({});
      res.status(200).json(allPosts);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};

// @desc     get all posts
// @route    /book/:id
// @access   admin/user
const getAllPostsById = async (req, res) => {
  let userId = req.params.id;
  try {
    let allPosts = await post.find({ authorId: userId });
    return res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
};
// @desc     save post
// @route    /save/:id
// @access   user
const savePost = async (req, res) => {
  try {
    let userId = req.user.id;
    let bookId = req.params.id;
    let foundBook = await book.findOne({ _id: bookId });
    let foundUser = await user.findOne({ _id: userId });
    if (foundUser) {
      let bookExist = false;
      foundUser.saved.map((e) => {
        if (e._id.toString() === bookId) {
          bookExist = true;
        }
      });
      if (bookExist) {
        res.status(400).json({ message: "book already saved" });
      } else {
        foundUser.saved.push(foundBook);
        res.status(200).json({ message: "added sucessfully !" });
        await foundUser.save();
      }
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};

// @desc     upload image
// @route    /admin/uploadbook
// @access   admin
const imgUpload = async (req, res) => {
  return res.status(200).json({ url: req.file.path });
};

export {
  getAllPostsById,
  imgUpload,
  createPost,
  deletePost,
  getPostbyId,
  savePost,
  updatePost,
  getAllPosts,
};
