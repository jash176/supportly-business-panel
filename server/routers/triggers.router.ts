import express from "express";
import { validateRequests, validateToken } from "../middlewares";
import {
  addTrigger,
  getTriggers,
  removeTrigger,
  updateTrigger,
} from "../controllers";
import { createTriggerValidation } from "../utils";
const router = express.Router();

// API for sending messages
router.post(
  "/add-trigger",
  validateToken,
  // validateRequests(createTriggerValidation),
  addTrigger
);

router.get("/get", getTriggers);

router.delete("/delete/:triggerId", validateToken, removeTrigger);

router.patch("/update", validateToken, updateTrigger);

export { router as triggerRouter };
