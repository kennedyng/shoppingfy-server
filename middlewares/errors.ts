import { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/utils/exceptions";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  let statusCode = 500; // Default status code for unhandled errors
  let status = "error";
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    // If it's an instance of any custom error class, extract status code, status, and message
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  // Send JSON response with appropriate status code and error message
  res.status(statusCode).json({ status, message });
}
