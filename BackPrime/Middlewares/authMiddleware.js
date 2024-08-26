import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.JWT;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.User = await User.findById(decoded.userId);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorised Invalid token");
    }
  } else {
    res.status(404);
    throw new Error("token not found");
  }
});

export { protect };
