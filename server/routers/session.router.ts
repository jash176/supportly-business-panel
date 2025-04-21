import express from "express";
import { validateToken } from "../middlewares";
import {
  getActiveVisitors,
  getAllContacts,
  updateMeta,
  updateSession,
} from "../controllers";
const router = express.Router();

router.put("/sessions/:sessionId", validateToken, updateSession);
router.get("/getContacts", validateToken, getAllContacts);
router.get("/active-users", validateToken, getActiveVisitors);
router.post("/meta", validateToken, updateMeta)

export { router as sessionRouter };
