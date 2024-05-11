import book from "../model/bookModel.js";
import user from "../model/userModel.js";


// @desc     add book
// @route    /admin/addbook
// @access   admin
const addBook = async (req, res) => {
  try {
    let { id } = req.user;
    let { title, author, rating, year, price, category,imgURL } = req.body;
    let userFound = await user.findOne({ _id: id });
    if (userFound.isAdmin) {
      await book.create({
        title,
        author,
        rating,
        year,
        price,
        category,
        imgURL
      });
      res.status(201).json({ message: "Book added successfully" });
    } else {
      res.send({ error: { message: "Dont have access to add book" } });
    }
  } catch (error) {
    res.status(500).json({ error: { message: error?.errorResponse?.errmsg } });
  }
};

// @desc     update book
// @route    /admin/updatebook/:id
// @access   admin
const updateBook = async (req, res) => {
  res.send("updatebook");
};

// @desc     delete book
// @route    /admin/deletebook/:id
// @access   admin
const deleteBook = async (req, res) => {
  res.send("deletebook");
};

// @desc     get bookbyId
// @route    /book/:id
// @access   admin/user
const getBookbyId = async (req, res) => {
  try {
    let bookId = req.params.id;
    const bookFound = await book.findOne({ _id: bookId });
    if (bookFound) {
      res.status(200).json(bookFound);
    } else {
      res.status(404).json({ message: "no book found" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};

// @desc     save book
// @route    /save/:id
// @access   user
const saveBook = async (req, res) => {
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
  return res.status(200).json({url:req.file.path})
};

export { deleteBook, addBook, updateBook, getBookbyId, saveBook, imgUpload };
