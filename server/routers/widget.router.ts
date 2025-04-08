import express from "express";
import { validateToken } from "../middlewares";
import { getWidgetSettings, updateWidget } from "../controllers";
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
