import express from "express";
import {
  createShortcut,
  fetchConversations,
  fetchMessagesByEmail,
  getMessagesForCustomer,
  getShortcuts,
  markAsRead,
  sendMessage,
  updateUserEmail,
} from "../controllers";
import { validateRequests, validateToken } from "../middlewares";
import {
  createShortcutSchema,
  fetchMessagesByEmailSchema,
  messageIdsSchema,
  sendMessageSchema,
  updateUserEmailSchema,
} from "../utils";
import { uploadSingleFile } from "../config/multer";
const router = express.Router();

// API for sending messages
router.post(
  "/send-message",
  uploadSingleFile("file"),
  validateRequests(sendMessageSchema),
  sendMessage
);

// API for fetching messages
router.get("/fetch-inbox", validateToken, fetchConversations);
router.post(
  "/fetch-message-email",
  validateToken,
  validateRequests(fetchMessagesByEmailSchema),
  fetchMessagesByEmail
);

// API for marking messages as read
router.post(
  "/mark-as-read",
  validateToken,
  validateRequests(messageIdsSchema),
  markAsRead
);

// APIs for updating user email
router.post(
  "/update-email",
  validateRequests(updateUserEmailSchema),
  updateUserEmail
);

// APIs for fetching messages for a customer
router.get("/fetch-customer-messages", getMessagesForCustomer);

// APIs for getting and creating canned responses
router.get("/shortcuts", validateToken, getShortcuts)
router.post("/create-shortcut", validateToken, validateRequests(createShortcutSchema), createShortcut)

export { router as messageRouter };
