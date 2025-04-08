import { Request, Response } from "express";
import Session from "../models/Sessions";
// Get all sessions for a business
export const getBusinessSessions = async (req: Request, res: Response) => {
  try {
    const { businessId } = req.params;
    
    const sessions = await Session.findAll({
      where: { businessId },
      order: [["createdAt", "DESC"]],
    });
    
    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// Get a specific session by ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    const session = await Session.findByPk(sessionId);
    
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    
    return res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ message: "Failed to fetch session" });
  }
};

// Update a session
export const updateSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const {
      assignedAgentId,
      isResolved,
      notes,
      segments,
      customerEmail,
    } = req.body;
    
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
    return res.status(500).json({ message: "Failed to assign agent to session" });
  }
};