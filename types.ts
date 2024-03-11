import { Request as ExpressRequest, Response, NextFunction } from "express";
export interface CustomRequest extends ExpressRequest {
  userData?: any; // Define the userData property
}
