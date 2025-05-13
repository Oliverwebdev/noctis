import { Response } from "express";
import { prisma } from "../db";
import { AuthRequest } from "../middlewares/auth";
export const deleteMe = async (_req: AuthRequest, res: Response) => {
  await prisma.user.delete({ where: { id: _req.user!.id } });
  res.status(204).end();
};
