import { Response } from "express";
import { prisma } from "../db";
import { env } from "../env";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email";
import { AuthRequest } from "../middlewares/auth";

export const register = async (req: AuthRequest, res: Response) => {
  const { email, username, password } = req.body;
  const hash = await argon2.hash(password);
  const user = await prisma.user.create({ data: { email, username, password: hash } });
  const token = crypto.randomUUID();
  await prisma.verificationToken.create({
    data: { token, userId: user.id, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) }
  });
  await sendVerificationEmail(email, token);
  res.status(201).json({ message: "Registration successful. Check your email." });
};

export const verifyEmail = async (req: AuthRequest, res: Response) => {
  const { token } = req.query as { token: string };
  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expiresAt < new Date()) return res.status(400).json({ error: "Invalid token" });
  await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } });
  await prisma.verificationToken.delete({ where: { token } });
  res.json({ message: "Email verified" });
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await argon2.verify(user.password, password))) return res.status(401).json({ error: "Invalid credentials" });
  if (!user.emailVerified) return res.status(403).json({ error: "Email not verified" });
  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email: user.email, username: user.username, createdAt: user.createdAt } });
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json({ id: user.id, email: user.email, username: user.username, createdAt: user.createdAt });
};
