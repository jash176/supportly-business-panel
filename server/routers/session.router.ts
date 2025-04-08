import express from "express";
import { validateToken } from "../middlewares";
import { updateSession } from "../controllers";
const router = express.Router();

router.put("/sessions/:sessionId", validateToken, updateSession);

export { router as sessionRouter };
