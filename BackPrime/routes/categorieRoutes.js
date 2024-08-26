import express from "express";
import {
  addCategorie,
  delCategorie,
  getAllCategories,
  updateCategorie,
} from "../controllers/CategorieController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addCategorie);
router.delete("/:id", protect, delCategorie);
router.get("/", getAllCategories);
router.put("/:id", protect, updateCategorie);
export default router;
