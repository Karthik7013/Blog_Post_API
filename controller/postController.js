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
      const posts = await post
        .find()
        .skip(limit * (page - 1))
        .limit(limit);
      res.status(200).json(posts);
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
    const userId = req.user.id;
    const postBody = req.body;
    const postId = "66681a2fd355b97fc0dee5a4";

    const postFound = await post.findOne({ _id: postId });
    const userFound = await user.findOne({ _id: userId });
    // userFound.saved.push(postFound);
    // userFound.save();

    if (userFound && postFound) {
      let postExist = false;
      userFound.saved.map((e) => {
        if (e._id.toString() === postFound._id.toString()) {
          postExist = true;
        }
      });
      if (postExist) {
        res.status(400).json({ message: "post already saved" });
      } else {
        userFound.saved.push(postFound);
        res.status(200).json({ message: "saved sucessfully !" });
        await userFound.save();
      }
    } else {
      res.status(404).json({ messag: "user not found !" });
    }
  } catch (error) {
    console.log(error)
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
