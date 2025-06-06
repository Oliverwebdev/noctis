import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: any, _req: Request, res: Response, _n: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
};
