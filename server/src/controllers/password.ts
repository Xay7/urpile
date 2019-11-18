import db from "../db/db";
import { RequestHandler } from "express";
import { error } from "../helpers/errors";
import bcrypt from "bcryptjs";

export const getPasswords: RequestHandler = async (req, res) => {
  const { userID } = req.session!;
  const { rows } = await db
    .query("SELECT * FROM passwords WHERE $1 = userid", [userID])
    .catch(error(500, "Database error"));
  console.log(rows);
  return res.status(400).send("OK");
};

export const getPassword: RequestHandler = async (req, res) => {
  return res.status(400).send("OK");
};

export const newPassword: RequestHandler = async (req, res) => {
  const { origin, username, password } = req.body;
  console.log(req.session);
  await db
    .query("INSERT INTO passwords(userid,origin,username,password) VALUES ($1,$2,$3,$4)", [
      req.session!.userID,
      origin,
      username,
      password
    ])
    .catch(error(500, "Database error"));

  return res.status(200).send("OK");
};

export const editPassword: RequestHandler = async (req, res) => {
  return res.status(400).send("OK");
};

export const deletePassword: RequestHandler = async (req, res) => {
  return res.status(400).send("OK");
};
