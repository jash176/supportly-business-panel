import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload, Secret } from "jsonwebtoken";
import { sendErrorResponse } from "../utils";
const TOKEN_PREFIX = "Bearer ";
const ERROR_MESSAGES = {
  NO_TOKEN: "Access denied, no token provided",
  INVALID_TOKEN: "Access denied, invalid token",
  MALFORMED_TOKEN: "Access denied, malformed token",
} as const;
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith(TOKEN_PREFIX)) {
    sendErrorResponse(res, 401, ERROR_MESSAGES.NO_TOKEN);
    return;
  }

  const token = authHeader.slice(TOKEN_PREFIX.length);

  if (!token || token.trim().length === 0) {
    sendErrorResponse(res, 401, ERROR_MESSAGES.MALFORMED_TOKEN);
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  try {
    const decoded = jsonwebtoken.verify(token, jwtSecret) as Business;
    req.business = decoded;
    next();
  } catch (error) {
    if (error instanceof jsonwebtoken.JsonWebTokenError) {
      sendErrorResponse(res, 401, ERROR_MESSAGES.INVALID_TOKEN);
      return;
    }
    // Pass unexpected errors to error handler
    next(error);
  }
};
