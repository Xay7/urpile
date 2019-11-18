import { Router } from "express";
import * as PasswordController from "../controllers/password";
import { validateBody, schemas, validateSession } from "../middlewares/validation";
const router = Router();

// Returns all user passwords

router
  .route("/")
  .get(validateSession, PasswordController.getPasswords)
  .post(validateSession, PasswordController.newPassword);

router
  .route(`/:id`)
  .get(validateSession, PasswordController.getPassword)
  .put(validateSession, PasswordController.editPassword)
  .delete(validateSession, PasswordController.deletePassword);

export default router;
