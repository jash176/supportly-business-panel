import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils";
import ApiKey from "../models/ApiKey";
import Customer from "../models/Customer";
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const { email, apiKey } = req.body;
    const apiKeyRecord = await ApiKey.findOne({
      where: { key: apiKey },
      attributes: ["businessId"],
    });
    if (!apiKeyRecord) {
      sendErrorResponse(res, 404, "Invalid API key");
      return;
    }
    // Check if the customer already exists for this business
    const existingCustomer = await Customer.findOne({
      where: { email, businessId: apiKeyRecord.businessId },
    });

    if (existingCustomer) {
      sendSuccessResponse(res, 200, "User already exists");
      return;
    }
    const name = email.split("@")[0];
    // Create new customer
    await Customer.create({
      name,
      email,
      businessId: apiKeyRecord.businessId,
      userAgent: "",
      referrer: "",
    });
    sendSuccessResponse(res, 201, "Customer added successfully");
  } catch (error) {
    sendErrorResponse(res, 500, "Error creating customer", error);
  }
};
