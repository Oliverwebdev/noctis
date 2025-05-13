import { Router } from "express";
import { getWidget, getChannels } from "../controllers/discord.controller";
import { authRequired } from "../middlewares/auth";
export const discordRouter = Router();
discordRouter.get("/widget", getWidget);
discordRouter.get("/channels", authRequired, getChannels);
