import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils";
import { deleteFileFromPublic } from "../config/multer";
import Widget from "../models/Widget";
import ApiKey from "../models/ApiKey";
import Business from "../models/Business";
import Agents from "../models/Agents";
export const updateWidget = async (req: Request, res: Response) => {
  try {
    const business = req.business; // Get the authenticated business ID
    if (!business || !business.id) {
      sendErrorResponse(res, 400, "Business not found");
      return;
    }
    // Get existing widget data
    const existingWidget = await Widget.findOne({
      where: { businessId: business.id },
    });
    if (!existingWidget) {
      sendErrorResponse(res, 404, "Widget not found for this business");
      return;
    }
    const { colorScheme, position, welcomeMessage } = req.body;
    const file = req.file;
    console.log("File:", file);
    let avatarUrl = req.body.avatarUrl;
    if (file && existingWidget.avatarUrl) {
      deleteFileFromPublic(existingWidget.avatarUrl);
    }
    if (file) {
      avatarUrl = `/public/${file.filename}`; // Relative path
      console.log("Avatar URL:", avatarUrl);
    }

    // Update the widget for the given business
    const widget = await Widget.update(
      {
        colorScheme,
        position,
        welcomeMessage,
        avatarUrl,
      },
      { where: { id: existingWidget.id } }
    );

    if (!widget) {
      sendErrorResponse(res, 404, "Widget not found for this business");
      return;
    }

    sendSuccessResponse(res, 200, "Widget updated successfully", widget);
  } catch (error: any) {
    console.error("Error updating widget:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

export const getWidgetSettings = async (req: Request, res: Response) => {
  try {
    const { apiKey } = req.query;
    if (!apiKey) {
      sendErrorResponse(res, 400, "API key is required.");
      return;
    }
    // Find the business associated with the API key
    const apiKeyEntry = await ApiKey.findOne({
      where: { key: apiKey as string },
      include: [
        {
          model: Business,
          attributes: ["businessName"],
          as: "Business",
        },
      ],
    });
    if (!apiKeyEntry) {
      sendErrorResponse(res, 404, "Invalid API key or business not registed.");
      return;
    }
    const { businessId } = apiKeyEntry;
    const widgetSettings = await Widget.findOne({
      where: { businessId: businessId },
    });

    if (!widgetSettings) {
      sendErrorResponse(
        res,
        404,
        "Widget settings not found for the business."
      );
      return;
    }
    // Get agents (limit to 3 oldest)
    const agents = await Agents.findAll({
      where: { businessId },
      attributes: ["id", "name", "avatar"],
      order: [["createdAt", "ASC"]],
      limit: 3,
    });

    // Get total agent count
    const totalAgents = await Agents.count({
      where: { businessId },
    });
    // Combine all data
    const response = {
      ...widgetSettings.toJSON(),
      businessName: apiKeyEntry.Business.businessName,
      agents,
      totalAgents,
    };
    sendSuccessResponse(
      res,
      200,
      "Widget settings retrieved successfully.",
      response
    );
  } catch (error) {
    console.error("Error fetching widget settings:", error);
    sendErrorResponse(res, 500, "Internal Server Error.");
  }
};
