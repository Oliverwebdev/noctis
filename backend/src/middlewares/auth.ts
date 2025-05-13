import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export interface AuthRequest extends Request { user?: { id: string } }

export const authRequired = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  try {
    const data = jwt.verify(header.substring(7), env.JWT_SECRET) as { id: string };
    req.user = { id: data.id };
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
