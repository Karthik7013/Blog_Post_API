import bcrypt from "bcrypt";
import user from "../model/userModel.js";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const KEY = "mysecretkey";

// @desc    user register
// @route   /register
// @access  public
const userRegister = async (req, res) => {
  try {
    let { userName, name, email, password } = req.body;
    let userExists = await user.findOne({ email: email });
    if (userExists) {
      res.status(400).json({ message: "email already exists" });
    } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          res.status(400).json({ message: "Failed to create salt" });
        }
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            res.status(400).json({ message: "Failed to register user !" });
          } else {
            await user.create({
              userName,
              name,
              email,
              password: hash,
            });
            res.status(201).json({ message: "user registered!" });
          }
        });
      });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};

// @desc    user login
// @route   /login
// @access  public
const userLogin = async (req, res) => {
  try {
    let { email, password, remember = false } = req.body;
    let userExists = await user.findOne({ email: email });
    if (userExists) {
      bcrypt.compare(password, userExists.password, function (err, result) {
        if (result) {
          let payload = {
            id: userExists._id,
          };
          let token = jwt.sign(payload, KEY, {
            expiresIn: remember ? "365d" : "1h",
          });
          res.status(200).json({ token, exp: remember ? "365D" : "1H" });
        } else {
          res.status(404).json({ message: "invalid login" });
        }
      });
    } else {
      res.status(404).json({ message: "invalid login" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};

// @desc    user profile
// @route   /profile
// @access  private
const userProfile = async (req, res) => {
  let foundUser = await user.findOne({ _id: req.user.id });
  if (!foundUser) {
    // throw new Error("Unauthorized access denied");
    return res.status(400).json({ message: "Unauthorized" });
  }
  res.send({ user: foundUser });
};

// @desc    update user
// @route   /profile/update/:id
// @access  private
const updatePassword = async (req, res) => {
  try {
    let id = req.user.id;
    let userExists = await user.findOne({ _id: id });
    if (userExists) {
      let { oldPassword, newPassword } = req.body;
      bcrypt.compare(
        oldPassword,
        userExists.password,
        async function (err, result) {
          if (result) {
            // encrypt new password
            bcrypt.genSalt(saltRounds, function (err, salt) {
              if (err) {
                res.status(400).json({ message: "Failed to create salt" });
              }
              bcrypt.hash(newPassword, salt, async function (err, hash) {
                if (err) {
                  res
                    .status(400)
                    .json({ message: "Failed to encrypt password !" });
                } else {
                  // update new encrypted password
                  user
                    .findOneAndUpdate(
                      { _id: id },
                      { $set: { password: hash } },
                      { new: true }
                    )
                    .then((updatedDoc) => {
                      res
                        .status(200)
                        .json({ message: "update success", user: updatedDoc });
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
              });
            });
          } else {
            res.status(400).json({ message: "wrong password" });
          }
        }
      );
    }
  } catch (error) {}
  // res.send({ message: "updatepassword" });
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  res.send({ message: "forgotpassword" });
};

export { userLogin, userRegister, userProfile, updatePassword, forgotPassword };
