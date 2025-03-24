import express from "express";
import {
  createAgent,
  createBusiness,
  createBusinessWorkspace,
  fetchBusinessId,
  loginBusiness,
} from "../controllers";
import { validateRequests, validateToken } from "../middlewares";
import { businessRegistrationSchema, businessWorkspaceSchema } from "../utils";
const router = express.Router();

router.post(
  "/register",
  validateRequests(businessRegistrationSchema),
  createBusiness
);

router.post(
  "/add-workspace",
  validateToken,
  validateRequests(businessWorkspaceSchema),
  createBusinessWorkspace
);
router.post("/login", loginBusiness);

router.get("/businessId", fetchBusinessId);

router.post("/create-agent", validateToken, createAgent)

export { router as businessRouter };
