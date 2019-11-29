import db from '../db/db';
import { RequestHandler } from 'express';
import { error } from '../helpers/errors';

export const getPasswords: RequestHandler = async (req, res) => {
  return res.status(400).send('OK');
};

export const getPassword: RequestHandler = async (req, res) => {
  return res.status(400).send('OK');
};

export const newPassword: RequestHandler = async (req, res) => {
  const { origin, username, password } = req.body;
  await db.query('INSERT INTO passwords(userid,origin,username,password) VALUES ($1,$2,$3,$4)', [req.session!.uid, origin, username, password]).catch(error(500, 'Database error'));

  return res.status(200).send('OK');
};

export const editPassword: RequestHandler = async (req, res) => {
  return res.status(400).send('OK');
};

export const deletePassword: RequestHandler = async (req, res) => {
  return res.status(400).send('OK');
};
