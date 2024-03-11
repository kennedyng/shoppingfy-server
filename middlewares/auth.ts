import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a new interface that extends ExpressRequest
interface CustomRequest extends ExpressRequest {
  userData?: any; // Define the userData property
}

// Middleware to authenticate token
export const checkAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  // Verify the token
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, userData: any) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }
      req.userData = userData; // Store user data in req.userData
      next();
    }
  );
};
