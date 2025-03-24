import express from "express";
import { validateRequests, validateToken } from "../middlewares";
import { getWidgetSettings, updateWidget } from "../controllers";
import { getWidgetSchema } from "../utils/validations";
import { uploadSingleFile } from "../config/multer";
const router = express.Router();

router.post(
  "/update",
  validateToken,
  uploadSingleFile("avatarUrl"),
  updateWidget
);

router.get("/get", getWidgetSettings);

export { router as widgetRouter };
