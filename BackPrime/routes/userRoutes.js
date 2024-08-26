import express from "express";
import {
  authuser,
  loginUser,
  logoutUser,
} from "../controllers/UserController.js";

const router = express.Router();
router.get("/login", authuser);
router.post("/callback", loginUser);
router.post("/logout", logoutUser);

export default router;
