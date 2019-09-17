import { Router } from "express";
import * as UserController from "../controllers/user";
import {
  validateBody,
  schemas,
  validateSession
} from "../middlewares/validation";

const router = Router();

router.post(
  "/register",
  validateBody(schemas.register),
  UserController.register
);

router.post(
  "/login",
  validateSession,
  validateBody(schemas.login),
  UserController.login
);

router.post("/logout", UserController.logout);

export default router;
