import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const data = { msg: "hello!" };
  console.log(data);
  res.json(data);
};
