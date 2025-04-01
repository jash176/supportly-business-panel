import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHandler.js";
import { generateToken } from "../utils";
import crypto from "crypto";
import Business from "../models/Business.js";
import ApiKey from "../models/ApiKey.js";
import Widget from "../models/Widget.js";
import Agents from "../models/Agents.js";
import { sendMail } from "../config/nodemailer.js";
import { agentInviteTemplate, welcomeEmailTemplate } from "../templates/email";
// Create a new business
export const createBusiness = async (req: Request, res: Response) => {
  try {
    const { password, email, name } = req.body;

    // Check for existing business
    const existingBusiness = await Business.findOne({
      where: { email },
    });
    if (existingBusiness) {
      sendErrorResponse(res, 400, "A business with this email already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Start a prisma transaction
    const business = await Business.sequelize?.transaction(async (t) => {
      // Create Business
      const newBusiness = await Business.create(
        {
          name,
          email,
          password: hash,
          subscriptionPlan: "freemium",
        },
        { transaction: t }
      );

      // Create API Key
      const apiKey = crypto.randomBytes(32).toString("hex"); // 64-character API key
      await ApiKey.create(
        {
          businessId: newBusiness.id,
          key: apiKey,
        },
        { transaction: t }
      );

      // Create an Agent with same info
      await Agents.create(
        {
          businessId: newBusiness.id,
          email,
          name,
          password: hash,
          role: "owner",
        },
        { transaction: t }
      );

      // Create Default Widget
      await Widget.create(
        {
          businessId: newBusiness.id,
        },
        { transaction: t }
      );

      return newBusiness;
    });
    // Generate token
    if (business) {
      const token = generateToken({
        id: business.id,
        email: business.email,
        name: business.name,
        userType: "owner",
      });
      // Send response
      sendSuccessResponse(res, 201, "Business registered", {
        business,
        token,
      });
    }
  } catch (error: any) {
    console.error("Error creating business:", error);
    sendErrorResponse(res, 500, error);
  }
};

export const createBusinessWorkspace = async (req: Request, res: Response) => {
  try {
    const { domain, businessName } = req.body;
    const business = req.business;
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found in the request");
      return;
    }
    const updatedBusiness = await Business.update(
      { domain, businessName },
      { where: { id: business.id }, returning: true }
    );
    if (!updatedBusiness) {
      sendErrorResponse(
        res,
        404,
        "Failed to create workspace for this business"
      );
      return;
    }
    const apiKey = await ApiKey.findOne({
      where: { businessId: business.id },
      attributes: ["key"],
    });

    // Send welcome email
    if (apiKey) {
      await sendMail({
        to: business.email,
        subject: `Welcome to Your ${businessName} Workspace!`,
        html: welcomeEmailTemplate({
          businessName: businessName,
          apiKey: apiKey.key,
        }),
      });
    }
    sendSuccessResponse(res, 200, "Workspace created");
  } catch (error: any) {
    console.error("Error creating workspace:", error);
    sendErrorResponse(res, 500, error);
    return;
  }
};

export const loginBusiness = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Agents.findOne({ where: { email } });
    // If no user found in either table
    if (!user) {
      sendErrorResponse(res, 404, "User not found");
      return;
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      sendErrorResponse(res, 400, "Invalid credentials");
      return;
    }
    // Generate token with user type
    const token = generateToken({
      id: user.id,
      email,
      name: user.name,
      userType: user.role as "owner" | "agent",
    });
    // Send success response with the user data and token
    sendSuccessResponse(res, 200, "Login successful", {
      user,
      token,
    });
  } catch (error: any) {
    console.error("Error logging in business:", error);
    sendErrorResponse(res, 500, "Server error");
  }
};

export const fetchBusinessId = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.query;
    // Find API Key and retrieve associated business ID
    const apiKeyRecord = await ApiKey.findOne({
      where: { key: apiKey as string },
      attributes: ["businessId"],
    });
    if (!apiKeyRecord) {
      sendErrorResponse(res, 404, "Business not found");
      return;
    }
    sendSuccessResponse(res, 200, "Business found", {
      businessId: apiKeyRecord.businessId,
    });
  } catch (error: any) {
    console.error("Error fetching business ID:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const authBusiness = req.business;
    if (!authBusiness || !authBusiness.id) {
      sendErrorResponse(res, 400, "Business ID is required");
      return;
    }
    // Find business and check seat count
    const business = await Business.findByPk(authBusiness.id, {
      include: { model: Agents, as: "Agents" },
    });

    if (!business) {
      sendErrorResponse(res, 400, "Business not found");
      return;
    }

    if (business.Agents.length >= business.maxSeats) {
      sendErrorResponse(res, 400, "Max seats limit reached");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new agent
    const agent = await Agents.create({
      businessId: business.id,
      email,
      name,
      password: hash,
    });

    await sendMail({
      to: email,
      subject: `Welcome to Your ${business.businessName} Workspace!`,
      html: agentInviteTemplate({
        businessName: business?.businessName || "",
        agentName: name,
        email,
        password,
        loginUrl: `https://supportly.site/login`,
      }),
    });

    sendSuccessResponse(res, 201, "Agent created", { agent });
    return;
  } catch (error) {
    console.error("Error creating agent:", error);
    sendErrorResponse(res, 500, "Internal server error");
    return;
  }
};

export const deleteAgent = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const business = req.business;

    // Check if business exists and has permission
    if (!business || !business.id) {
      sendErrorResponse(res, 401, "Unauthorized - Business not found");
      return;
    }

    // Check if agent exists and belongs to the business
    const agent = await Agents.findOne({
      where: {
        id: agentId,
        businessId: business.id,
      },
    });

    if (!agent) {
      sendErrorResponse(res, 404, "Agent not found");
      return;
    }

    // Prevent deletion of owner account
    if (agent.role === "owner") {
      sendErrorResponse(res, 403, "Cannot delete owner account");
      return;
    }

    // Delete the agent
    await Agents.destroy({
      where: {
        id: agentId,
        businessId: business.id,
      },
    });

    sendSuccessResponse(res, 200, "Agent deleted successfully");
  } catch (error) {
    console.error("Error deleting agent:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const fetchAgents = async (req: Request, res: Response) => {
  try {
    const business = req.business;

    // Check if business exists
    if (!business || !business.id) {
      sendErrorResponse(res, 401, "Unauthorized - Business not found");
      return;
    }

    // Fetch all agents except owner
    const agents = await Agents.findAll({
      where: {
        businessId: business.id,
      },
      attributes: ["id", "name", "email", "role", "createdAt"], // Only select necessary fields
      order: [["createdAt", "DESC"]], // Sort by creation date
    });

    sendSuccessResponse(res, 200, "Agents retrieved successfully", {
      agents,
      count: agents.length,
    });
  } catch (error) {
    console.error("Error fetching agents:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};

export const fetchWorkspaceDetails = async (req: Request, res: Response) => {
  try {
    const business = req.business;

    // Check if business exists
    if (!business || !business.id) {
      sendErrorResponse(res, 401, "Unauthorized - Business not found");
      return;
    }

    // Fetch business details including related data
    const workspaceDetails = await Business.findOne({
      where: { id: business.id },
      attributes: [
        "id",
        "name",
        "email",
        "businessName",
        "domain",
        "subscriptionPlan",
        "maxSeats",
        "createdAt",
      ],
      include: [
        {
          model: Widget,
          as: "Widget",
        },
        {
          model: Agents,
          as: "Agents",
          attributes: ["id", "name", "email", "role", "createdAt"],
          order: [["createdAt", "DESC"]],
        },
      ],
    });

    if (!workspaceDetails) {
      sendErrorResponse(res, 404, "Workspace not found");
      return;
    }

    sendSuccessResponse(res, 200, "Workspace details retrieved successfully", {
      workspace: workspaceDetails,
      agentCount: workspaceDetails.Agents?.length || 0,
    });
  } catch (error) {
    console.error("Error fetching workspace details:", error);
    sendErrorResponse(res, 500, "Internal server error");
  }
};
