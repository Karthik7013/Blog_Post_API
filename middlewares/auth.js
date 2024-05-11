import jwt from "jsonwebtoken";
import getAuthToken from "../utils/getAuthToken.js";
const KEY = "mysecretkey";
const isAuthenticate = (req, res, next) => {
  const token = getAuthToken(req);
  if (!token) {
    return res.status(404).json({ message: "Token Required" });
  }

  jwt.verify(token, KEY, (err, decoded) => {
    if (err) {
      throw new Error('invalid/expired token')
    } else {
      req.user = decoded;
      next();
    }
  });
};
export default isAuthenticate;
