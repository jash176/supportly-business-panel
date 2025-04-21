import { Request, Response } from "express";
import Session from "../models/Sessions";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHandler";
import { Op } from "sequelize";
import { onlineUsers } from "../config/socket";
// Get all sessions for a business
export const getBusinessSessions = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;

    const sessions = await Session.findAll({
      where: { businessId },
      order: [["createdAt", "DESC"]],
    });
    sendSuccessResponse(res, 200, "Session fetched successfully", sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    sendErrorResponse(res, 500, "Failed to fetch sessions");
  }
};

// Get a specific session by ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findByPk(sessionId);

    if (!session) {
      sendErrorResponse(res, 404, "Session not found");
    }
    sendSuccessResponse(res, 200, "Session fetched successfully", session);
  } catch (error) {
    console.error("Error fetching session:", error);
    sendErrorResponse(res, 500, "Failed to fetch session");
  }
};

// Update a session
export const updateSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { assignedAgentId, isResolved, notes, segments, customerEmail } =
      req.body;

    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Update session properties
    if (assignedAgentId !== undefined) {
      session.assignedAgentId = assignedAgentId;
    }

    if (isResolved !== undefined) {
      session.isResolved = isResolved;
    }

    if (notes !== undefined) {
      session.notes = notes;
    }

    if (segments !== undefined) {
      session.segments = segments;
    }

    if (customerEmail !== undefined) {
      session.customerEmail = customerEmail;
    }

    await session.save();

    return res.status(200).json({
      message: "Session updated successfully",
      session,
    });
  } catch (error) {
    console.error("Error updating session:", error);
    return res.status(500).json({ message: "Failed to update session" });
  }
};

// Mark a session as resolved
export const resolveSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.isResolved = true;
    await session.save();

    return res.status(200).json({
      message: "Session marked as resolved",
      session,
    });
  } catch (error) {
    console.error("Error resolving session:", error);
    return res.status(500).json({ message: "Failed to resolve session" });
  }
};

// Assign an agent to a session
export const assignAgentToSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { agentId } = req.body;

    const session = await Session.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    session.assignedAgentId = agentId;
    await session.save();

    return res.status(200).json({
      message: "Agent assigned to session successfully",
      session,
    });
  } catch (error) {
    console.error("Error assigning agent:", error);
    return res
      .status(500)
      .json({ message: "Failed to assign agent to session" });
  }
};

// Get all contacts (sessions with unique emails)

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const business = req.business;
    if (!business) {
      sendErrorResponse(res, 401, "Unauthorized");
      return;
    }
    const businessId = business.id;
    const contacts = await Session.findAll({
      where: {
        businessId: businessId,
        customerEmail: {
          [Op.and]: {
            [Op.ne]: null,
          },
        },
      },
    });

    sendSuccessResponse(res, 200, "Contacts fetched successfully", contacts);
    return;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    sendErrorResponse(res, 500, "Failed to fetch contacts");
    return;
  }
};

export const getActiveVisitors = async (req: Request, res: Response) => {
  try {
    const business = req.business;
    if (!business) {
      sendErrorResponse(res, 401, "Unauthorized");
      return;
    }
    const businessId = business.id;
    const onlineSessionIds = Array.from(onlineUsers.keys());
    console.log("onlineSessionIds : ", onlineSessionIds, onlineUsers);
    const activeVisitors = await Session.findAll({
      where: {
        businessId: businessId,
        sid: {
          [Op.in]: onlineSessionIds,
        },
      },
    });
    sendSuccessResponse(
      res,
      200,
      "Active visitors fetched successfully",
      activeVisitors
    );
  } catch (error) {
    console.error("Error fetching active visitors:", error);
    sendErrorResponse(res, 500, "Failed to fetch active visitors");
    return;
  }
};

export const updateMeta = async (req: Request, res: Response) => {
  try {
    const { sessionId, segments, notes } = req.body;
    const business = req.business;
    if (!business) {
      sendErrorResponse(res, 401, "Unauthorized");
      return;
    }
    const businessId = business.id;
    const session = await Session.findOne({where: {id: sessionId, businessId}});
    if(!session) {
      sendErrorResponse(res, 400, "Session not found");
      return;
    }
    const updates: any = {};
    if (segments !== undefined) updates.segments = segments;
    if (notes !== undefined) updates.notes = notes;
    const newSession = await session.update(updates)
    sendSuccessResponse(res, 201, "Session meta updated", newSession)
  }catch(error) {
    console.error("Error updating meta:", error);
    sendErrorResponse(res, 500, "Failed to updating meta");
    return;
  }
}
