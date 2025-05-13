import dotenv from "dotenv";
dotenv.config();
export const env = {
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: Number(process.env.SMTP_PORT || 587),
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  CLIENT_URL: process.env.CLIENT_URL!,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN!,
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID!
};
