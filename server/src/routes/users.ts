import { Router } from "express";
import * as UserController from "../controllers/user";
import { validateBody, schemas, validateSession } from "../middlewares/validation";

const router = Router();

router.post("/register", validateBody(schemas.register), UserController.register);

router.post("/login", validateBody(schemas.login), UserController.login);

router.post("/logout", validateSession, UserController.logout);

router.get("/dashboard", validateSession, UserController.dashboard);

export default router;
