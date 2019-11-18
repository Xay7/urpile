import { Router } from "express";
import * as UserController from "../controllers/user";
import * as PasswordController from "../controllers/password";
import { validateBody, schemas, validateSession } from "../middlewares/validation";

const router = Router();

router.post("/register", validateBody(schemas.register), UserController.register);

router.post("/login", validateBody(schemas.login), UserController.login);

router.post("/logout", validateSession, UserController.logout);

router.get("/dashboard", validateSession, UserController.dashboard);

router.get("/passwords/", validateSession, PasswordController.getPasswords);

router
  .route("/passwords/:id")
  .get(validateSession, PasswordController.getPassword)
  .post(validateSession, PasswordController.newPassword)
  .put(validateSession, PasswordController.editPassword)
  .delete(validateSession, PasswordController.deletePassword);

export default router;
