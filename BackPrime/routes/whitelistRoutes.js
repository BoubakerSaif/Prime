import express from "express";
import {
  acceptWhitelist,
  addWhitelist,
  delWhitelist,
  getEmsWhitelists,
  getNormalWhitelists,
  getPoliceWhitelists,
  rejectWhitelist,
} from "../controllers/WhitelistController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", addWhitelist);
router.delete("/:id", delWhitelist);
router.get("/police", getPoliceWhitelists);
router.get("/ems", getEmsWhitelists);
router.get("/normal", getNormalWhitelists);
router.put("/:id/accept", acceptWhitelist);
router.put("/:id/reject", rejectWhitelist);

export default router;
