import { Request, Response } from "express";
import { logger, sendErrorResponse, sendSuccessResponse } from "../utils";
import Triggers from "../models/Trigger";
import ApiKey from "../models/ApiKey";
import Session from "../models/Sessions";
import Message from "../models/Message";
import { onlineUsers } from "../config/socket";
import { io } from "..";
export const addTrigger = async (req: Request, res: Response) => {
  try {
    const {
      name,
      identifier,
      action,
      message,
      conditions,
      onlyIfOnline,
      delayTime,
      executeOnce,
    } = req.body;
    const business = req.business;
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found");
      return;
    }
    const newTrigger = await Triggers.create({
      name,
      identifier,
      action,
      message,
      conditions,
      onlyIfOnline,
      delayTime,
      executeOnce,
      businessId: business.id,
    });
    // Add trigger logic here
    sendSuccessResponse(res, 201, "Trigger added successfully", newTrigger);
  } catch (error) {
    console.log(`Error adding trigger: ${error}`);
    sendErrorResponse(res, 500, "Error adding trigger");
  }
};

export const getTriggers = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.query;
    if (!apiKey) {
      sendErrorResponse(res, 400, "API Key and Session ID are required");
      return;
    }
    const apiKeyRecord = await ApiKey.findOne({
      where: { key: apiKey as string },
      attributes: ["businessId"],
    });
    if (!apiKeyRecord) {
      sendErrorResponse(res, 404, "Business not found");
      return;
    }
    const triggers = await Triggers.findAll({
      where: { businessId: apiKeyRecord.businessId },
      order: [["createdAt", "ASC"]],
    });
    sendSuccessResponse(res, 200, "Triggers retrieved successfully", triggers);
  } catch (error) {
    logger.error(`Error retrieving triggers: ${error}`);
    sendErrorResponse(res, 500, "Error retrieving triggers");
  }
};

export const sendTriggerMessage = async ({
  sessionId,
  trigger,
}: {
  sessionId: string;
  trigger: Triggers;
}) => {
  console.log("Trigger occurred");
  let session = await Session.findOne({
    where: {
      businessId: trigger.businessId,
      sid: sessionId,
    },
  });
  if (session) {
    const message = await Message.create({
      businessId: trigger.businessId,
      customerEmail: session.customerEmail || null,
      sessionId: session.id,
      sender: "business",
      contentType: "text",
      content: trigger.message,
      senderId: session.assignedAgentId || null,
    });
    let recipientSocketId = onlineUsers.get(sessionId);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("trigger-message", message, trigger);
    }
  }
};

export const removeTrigger = async (req: Request, res: Response) => {
  try {
    const { triggerId } = req.params;
    if (!triggerId) {
      sendErrorResponse(res, 400, "Trigger ID is required");
      return;
    }
    const trigger = await Triggers.findOne({ where: { id: triggerId } });
    if (!trigger) {
      sendErrorResponse(res, 404, "Trigger not found");
      return;
    }
    await trigger.destroy();
    sendSuccessResponse(res, 200, "Trigger removed successfully");
  } catch (error) {
    logger.error(`Error removing trigger: ${error}`);
    sendErrorResponse(res, 500, "Error removing trigger");
  }
};

export const updateTrigger = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      identifier,
      action,
      message,
      conditions,
      onlyIfOnline,
      delayTime,
      executeOnce,
    } = req.body;
    const trigger = await Triggers.findOne({ where: { id } });
    if (!trigger) {
      sendErrorResponse(res, 404, "Trigger not found");
      return;
    }
    await trigger.update(
      {
        name,
        identifier,
        action,
        message,
        conditions,
        onlyIfOnline,
        delayTime,
        executeOnce,
      },
      { where: { id } }
    );
    sendSuccessResponse(res, 200, "Trigger updated successfully", trigger);
  } catch (error) {
    logger.error(`Error updating trigger: ${error}`);
    sendErrorResponse(res, 500, "Error updating trigger");
  }
};
