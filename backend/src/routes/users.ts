import { Router } from "express";
import { deleteMe } from "../controllers/users.controller";
import { authRequired } from "../middlewares/auth";
export const usersRouter = Router();
usersRouter.delete("/me", authRequired, deleteMe);
