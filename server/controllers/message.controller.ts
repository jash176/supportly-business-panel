import { Request, Response } from "express";
import { logger, sendErrorResponse, sendSuccessResponse } from "../utils";
import { onlineUsers } from "../config/socket";
import { io } from "../index";
import Message from "../models/Message";
import { v4 as uuidv4 } from "uuid";
import Agents from "../models/Agents";
import ApiKey from "../models/ApiKey";
import Session from "../models/Sessions";
import CannedResponse from "../models/CannedResponse";
import Widget from "../models/Widget";
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { businessId, customerEmail, sender, contentType, senderId } =
      req.body;
    const file = req.file;
    let content = req.body.content;
    let sessionId = req.body.sessionId;
    // **Find or Create a Session**
    let session = await Session.findOne({
      where: {
        businessId,
        ...(customerEmail ? { customerEmail } : { sid: sessionId }),
      },
    });
    // Check if this is first message in session
    const messageCount = await Message.count({
      where: { sessionId: session?.id },
    });

    const isFirstMessage = messageCount === 1;
    console.log(" session", sessionId, session);
    if (!session) {
      sessionId = sessionId || uuidv4();
      session = await Session.create({
        businessId,
        customerEmail: customerEmail || null,
        sid: sessionId, // Used for anonymous users
      });
    }
    // If content type is image or audio, use the local file path
    if (contentType === "image" || contentType === "audio") {
      if (!file) {
        sendErrorResponse(res, 400, "File is required");
        return;
      }
      content = `/public/${file.filename}`; // Relative path
    }
    // Update assignedAgent if message is from business
    if (sender === "business" && senderId) {
      await Session.update(
        { assignedAgentId: senderId },
        { where: { id: session.id } }
      );
    }

    // Save the message in Database
    const message = await Message.create({
      businessId: parseInt(businessId),
      customerEmail: customerEmail || null,
      sessionId: session.id,
      sender,
      contentType,
      content,
      senderId,
    });
    if (isFirstMessage && !customerEmail) {
      const automatedMessage = await Message.create({
        businessId: parseInt(businessId),
        sessionId: session.id,
        sender: "business",
        contentType: "email_prompt",
        content:
          "Please provide your email address to help us serve you better.",
      });
      let recipientSocketId = onlineUsers.get(sessionId); // If business sends, notify customer
      // **Emit only to the intended recipient**
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", automatedMessage);
      }
    }
    // Get agent details if senderId exists
    let messageWithAgent: any = message.toJSON();
    if (sender === "business" && senderId) {
      const agent = await Agents.findByPk(senderId, {
        attributes: ["id", "name", "avatar"],
      });
      messageWithAgent = {
        ...messageWithAgent,
        agent,
      };
    }
    // **Determine recipient**
    let recipientSocketId =
      sender === "customer"
        ? onlineUsers.get(businessId) // If customer sends, notify business
        : onlineUsers.get(sessionId); // If business sends, notify customer
    // **Emit only to the intended recipient**
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageWithAgent);
    }
    sendSuccessResponse(res, 201, "Message saved successfully", message);
  } catch (error) {
    console.log("Errpr " + error);
    sendErrorResponse(res, 500, "Server Error");
    return;
  }
};

export const fetchConversations = async (req: Request, res: Response) => {
  try {
    const business = req.business;
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found in the request");
      return;
    }

    // Fetch all active sessions for the business with metadata
    const sessions = await Session.findAll({
      where: { businessId: business.id },
      attributes: [
        "id",
        "customerEmail",
        "isResolved",
        "sid",
        // Geolocation data
        "geolocationCountry",
        "geolocationRegion",
        "geolocationCity",
        "geolocationLatitude",
        "geolocationLongitude",
        // System and browser information
        "osVersion",
        "osName",
        "engineName",
        "engineVersion",
        "browserName",
        "browserVersion",
        "userAgent",
      ],
    });

    if (!sessions.length) {
      sendErrorResponse(res, 404, "No active conversations found");
      return;
    }

    // ✅ Extract session IDs
    const sessionIds = sessions.map((s) => s.id);
    // Fetch all messages related to the business
    const messages = await Message.findAll({
      where: { sessionId: sessionIds },
      order: [["timestamp", "DESC"]],
    });
    if (messages.length === 0) {
      sendErrorResponse(res, 404, "No conversations found");
      return;
    }
    const sessionMap = new Map<number, any>();
    let visitorCount = 1;
    sessions.forEach((session) => {
      const name = session.customerEmail
        ? session.customerEmail.split("@")[0] // Use part before @ in email
        : `visitor${visitorCount++}`; // Generate visitor name with counter
      sessionMap.set(session.id, {
        sessionId: session.id,
        sid: session.sid,
        name,
        customerEmail: session.customerEmail,
        isResolved: session.isResolved,
        lastMessage: null,
        lastMessageType: null,
        lastMessageTime: null,
        totalMessages: 0,
        unreadMessages: 0,
        // Add metadata
        metadata: {
          geolocation: {
            country: session.geolocationCountry,
            region: session.geolocationRegion,
            city: session.geolocationCity,
            latitude: session.geolocationLatitude,
            longitude: session.geolocationLongitude,
          },
          system: {
            osVersion: session.osVersion,
            osName: session.osName,
            engineName: session.engineName,
            engineVersion: session.engineVersion,
            browserName: session.browserName,
            browserVersion: session.browserVersion,
            userAgent: session.userAgent,
          },
        },
      });
    });

    // ✅ Group messages by sessionId
    messages.forEach((msg) => {
      if (sessionMap.has(msg.sessionId)) {
        const conversation = sessionMap.get(msg.sessionId);

        // Set the last message details (latest message already sorted)
        if (!conversation.lastMessage) {
          conversation.lastMessage = msg.content;
          conversation.lastMessageType = msg.contentType;
          conversation.lastMessageTime = msg.timestamp;
        }

        conversation.totalMessages += 1;
        if (!msg.isRead) {
          conversation.unreadMessages += 1;
        }
      }
    });
    // ✅ Convert the map to an array and sort by lastMessageTime
    const conversations = Array.from(sessionMap.values()).sort(
      (a, b) => b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    );

    sendSuccessResponse(res, 200, "Success", conversations);
  } catch (error) {
    console.log("Errro ; ", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

export const fetchMessagesByEmail = async (req: Request, res: Response) => {
  try {
    const business = req.business;
    const { sessionId } = req.body;

    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business ID is required");
      return;
    }

    // First validate if the session belongs to this business
    const session = await Session.findOne({
      where: {
        sid: sessionId,
        businessId: business.id,
      },
    });

    if (!session) {
      sendErrorResponse(res, 404, "Session not found or unauthorized");
      return;
    }

    // Fetch messages from MySQL using Prisma
    const messages = await Message.findAll({
      where: { sessionId: session.id },
      order: [["timestamp", "ASC"]],
    });

    if (!messages.length) {
      sendErrorResponse(res, 404, "No messages found");
      return;
    }
    sendSuccessResponse(res, 200, "Messages retrieved successfully", messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { messageIds } = req.body;
    const ids: number[] = messageIds.split(",");
    const business = req.business;
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business ID is required");
      return;
    }
    await Message.update({ isRead: true }, { where: { id: ids } });
    sendSuccessResponse(res, 200, "Messages Marked as Read!");
  } catch (error) {
    logger.error("Error marking as read : ", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const updateUserEmail = async (req: Request, res: Response) => {
  try {
    const { sessionId, customerEmail } = req.body;
    await Session.update({ customerEmail }, { where: { sid: sessionId } });
    sendSuccessResponse(res, 200, "User email updated!");
  } catch (error) {
    logger.error("Error updating email : ", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const transferChat = async (req: Request, res: Response) => {
  try {
    const { sessionId, newAgentId } = req.body;

    // Check if agent exists
    const agent = await Agents.findByPk(newAgentId);
    if (!agent) {
      sendErrorResponse(res, 404, "Agent  not found");
      return;
    }

    // Update messages to be assigned to the new agent
    await Message.update({ senderId: newAgentId }, { where: { sessionId } });

    sendSuccessResponse(res, 200, "Chat transferred successfully");
  } catch (error) {
    console.error("Error transferring chat:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

export const getMessagesForCustomer = async (req: Request, res: Response) => {
  try {
    const { apiKey, sessionId } = req.query;
    if (!apiKey || !sessionId) {
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
    // Fetch session and validate if it belongs to the business
    const session = await Session.findOne({
      where: {
        sid: sessionId as string,
        businessId: apiKeyRecord.businessId, // Ensures session belongs to this business
      },
      attributes: ["id", "customerEmail", "isResolved"], // Fetch relevant session data
    });
    if (!session) {
      const newSession = await Session.create({
        businessId: apiKeyRecord.businessId,
        customerEmail: null,
        sid: sessionId as string, // Used for anonymous users
      });
      const widget = await Widget.findOne({
        where: { businessId: apiKeyRecord.businessId },
        attributes: ["welcomeMessage"],
      });
      if (widget && widget.welcomeMessage) {
        const welcomeMessage = await Message.create({
          businessId: apiKeyRecord.businessId,
          sessionId: newSession.id,
          sender: "business",
          contentType: "text",
          content: widget.welcomeMessage,
        });
        const messages = [welcomeMessage];
        // messages.push(welcomeMessage);
        sendSuccessResponse(res, 200, "Messages fetched successfully", {
          messages,
          currentAgent: null, // Send assigned agent details
        });
        return;
      }
      sendSuccessResponse(res, 400, "Widget not found");
      return;
    }
    // Fetch all messages for this customer
    const messages = await Message.findAll({
      where: {
        sessionId: session.id,
      },
      order: [["timestamp", "ASC"]],
    });

    // Determine the last assigned agent
    const lastAgentMessage = await Message.findOne({
      where: {
        sessionId: session.id,
        sender: "business",
      },
      order: [["timestamp", "DESC"]], // Get the latest agent message
    });

    let agent = null;
    if (lastAgentMessage?.senderId) {
      agent = await Agents.findByPk(lastAgentMessage.senderId, {
        attributes: ["id", "name", "avatar"],
      });
    }

    sendSuccessResponse(res, 200, "Messages fetched successfully", {
      messages,
      currentAgent: agent, // Send assigned agent details
      customerEmail: session.customerEmail, // Send customer email
      isResolved: session.isResolved, // Send resolved status
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    sendErrorResponse(res, 500, "Server Error");
  }
};

export const createShortcut = async (req: Request, res: Response) => {
  try {
    const { shortcut, message } = req.body;
    const business = req.business; // Get the authenticated business ID
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found");
      return;
    }
    const cannedResponse = await CannedResponse.create({
      businessId: business.id,
      shortcut,
      message,
    });
    sendSuccessResponse(
      res,
      201,
      "Shortcut created successfully",
      cannedResponse
    );
  } catch (error) {
    logger.error("Error creating shortcut:", error);
    sendErrorResponse(res, 500, "Server Error");
  }
};

export const getShortcuts = async (req: Request, res: Response) => {
  try {
    const business = req.business;
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found");
      return;
    }
    const shortcuts = await CannedResponse.findAll({
      where: { businessId: business.id },
      attributes: ["id", "shortcut", "message"],
    });
    sendSuccessResponse(
      res,
      200,
      "Shortcuts retrieved successfully",
      shortcuts
    );
  } catch (error) {
    logger.error("Error fetching shortcuts:", error);
    sendErrorResponse(res, 500, "Server Error");
  }
};

export const updateSessionMeta = async (metadata: SessionMetadata) => {
  try {
    const { sessionId, geolocation, system } = metadata;

    const session = await Session.findOne({
      where: { sid: sessionId },
    });

    if (!session) {
      logger.error(`Session not found for ID: ${sessionId}`);
      return;
    }

    await Session.update(
      {
        // Geolocation data
        geolocationCountry: geolocation?.country || null,
        geolocationRegion: geolocation?.region || null,
        geolocationCity: geolocation?.city || null,
        geolocationLatitude: geolocation?.latitude || null,
        geolocationLongitude: geolocation?.longitude || null,

        // System and browser information
        osVersion: system?.osVersion || null,
        osName: system?.osName || null,
        engineName: system?.engineName || null,
        engineVersion: system?.engineVersion || null,
        browserName: system?.browserName || null,
        browserVersion: system?.browserVersion || null,
        userAgent: system?.userAgent || null,
      },
      {
        where: { sid: sessionId },
      }
    );

    logger.info(`Session metadata updated for session: ${sessionId}`);
    return true;
  } catch (error) {
    logger.error("Error updating session metadata:", error);
    return false;
  }
};
