import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const data = { msg: "hello!" };
  console.log(data);
  res.json(data);
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  const data = { msg: "hello!" };
  console.log(data);
  res.json(data);
};

export { loginUser, registerUser };
