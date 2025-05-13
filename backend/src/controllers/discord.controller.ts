// src/controllers/discord.controller.ts
import type { Response } from "express";
import { env } from "../env.ts";
import { AuthRequest } from "../middlewares/auth.js";

const BASE = "https://discord.com/api";

export const getWidget = async (_req: AuthRequest, res: Response) => {
  const r = await fetch(`${BASE}/guilds/${env.DISCORD_GUILD_ID}/widget.json`);
  if (!r.ok) return res.status(400).json({ error: "Widget disabled" });
  res.json(await r.json());
};

export const getChannels = async (_req: AuthRequest, res: Response) => {
  const r = await fetch(`${BASE}/guilds/${env.DISCORD_GUILD_ID}/channels`, {
    headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}` }
  });
  if (!r.ok) return res.status(400).json({ error: "Discord API error" });
  res.json((await r.json()).filter((c: any) => c.type === 0));
};
