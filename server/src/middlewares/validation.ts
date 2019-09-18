import Joi, { Schema } from "@hapi/joi";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const result = schema.validate(req.body);
    if (result.error) {
      let errorMessage = "Unknown error";
      if (result.error.details[0].context!.label) {
        errorMessage = result.error.details[0].context!.label;
      }
      return res.status(401).send(errorMessage);
    }
    next();
  };
};

export const validateSession: RequestHandler = (req, res, next) => {
  if (req.session!.user) {
    // Return some user data
    return res.status(200).send("ok");
  }
  next();
};

export const schemas = {
  register: Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(24)
      .required()
      .label("Invalid username"),
    password: Joi.string()
      .min(6)
      .max(4096)
      .required()
      .label("Invalid password"),
    email: Joi.string()
      .email()
      .required()
      .label("Invalid email")
  }),
  login: Joi.object().keys({
    password: Joi.string()
      .min(6)
      .max(4096)
      .required()
      .label("Invalid password"),
    email: Joi.string()
      .email()
      .required()
      .label("Invalid email"),
    remember: Joi.string().required()
  })
};
