import rateLimit from "express-rate-limit";

/**
 * 10 Requests pro Minute – reicht für Auth-Flows
 * Standard- & Legacy-Headers deaktiviert (sauberere Antworten)
 */
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
