import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendErrorResponse } from "../utils";

export const validateRequests = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorDetails = error.details.map((detail) => ({
        key: detail.path[0],
        message: detail.message,
      }));
      sendErrorResponse(res, 400, "Invalid request", errorDetails);
      return;
    }
    next();
  };
};
