import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { discordRouter } from "./routes/discord";
import { errorHandler } from "./middlewares/error";

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: "*" })); // tighten in production
  app.use(express.json());
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/discord", discordRouter);
  app.use(errorHandler);
  return app;
};
