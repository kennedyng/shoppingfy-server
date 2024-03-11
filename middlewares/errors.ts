import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
