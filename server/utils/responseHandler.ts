import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success: true,
    status: statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
) => {
  const response: ApiResponse<null> = {
    success: false,
    status: statusCode,
    message,
    data: null,
  };
  if (error) {
    response.data = error;
  }
  return res.status(statusCode).json(response);
};
