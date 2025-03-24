import { NextFunction, Request, Response } from "express";
import { logger, sendErrorResponse } from "../utils";

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err.stack || err.message);

  // Set default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  sendErrorResponse(
    res,
    statusCode,
    message,
    process.env.NODE_ENV === "development" ? err.stack : undefined
  );
};
