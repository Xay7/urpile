import db from "../db/db";
import { RequestHandler } from "express";
import { error } from "../helpers/errors";
import bcrypt from "bcryptjs";

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password, email }: { username: string; password: string; email: string } = req.body;

    // Check if email is arleady in use
    const { rows } = await db
      .query("SELECT email FROM users WHERE email = $1", [email])
      .catch(error(500, "Database error"));

    if (rows.length) {
      return res.status(401).send("Email arleady in use");
    }

    // Hash password and save data to the database
    const salt = await bcrypt.genSalt(10).catch(error(500, "Error occured when generating salt"));
    const hashedPassword = await bcrypt.hash(password, salt).catch(error(500, "Error occured when hashing password"));
    await db
      .query("INSERT INTO users(username,password,email) VALUES ($1,$2,$3)", [username, hashedPassword, email])
      .catch(error(500, "Database error"));

    return res.status(200).send("Account has been registered");
  } catch (error) {
    return res.status(error.status).send(error.details);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password, remember }: { email: string; password: string; remember: boolean } = req.body;
    const { rows } = await db
      .query("SELECT * FROM users WHERE email = $1", [email])
      .catch(error(500, "Database error"));
    if (!rows.length) {
      return res.status(401).send("Email doesn't exists");
    }

    const validPassword = await bcrypt
      .compare(password, rows[0].password)
      .catch(error(500, "Error occured when validating password"));

    if (!validPassword) {
      return res.status(401).send("Invalid password");
    }

    if (remember) {
      req.session!.cookie.maxAge = 604800000;
    }
    req.session!.userID = rows[0].id;

    // Data we want to send to user after successful authentication
    console.log(req.session);

    return res.status(200).send("Login success");
  } catch (error) {
    return res.status(error.status).send(error.details);
  }
};

export const logout: RequestHandler = (req, res) => {
  // Clear server and client side session
  req.session!.destroy(err => {
    if (err) {
      return res.status(400).send("Logout error");
    }
    return res
      .status(200)
      .clearCookie("connect.sid", { path: "/" })
      .send({ status: "Logout successful" });
  });
};

export const dashboard: RequestHandler = (req, res) => {
  console.log(req.session);
  return res.status(200).send("Ok");
};
