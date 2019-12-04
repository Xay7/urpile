import db from '../db/db';
import { RequestHandler } from 'express';
import { error } from '../helpers/errors';

export const getNotes: RequestHandler = async (req, res) => {
  const { uid } = req.session!;

  const response = await db
    .query('SELECT id,title,beginning,ending,color FROM notes WHERE uid = $1', [uid])
    .catch(error(500, 'Database error'));

  return res.status(200).send(response.rows);
};

export const postNote: RequestHandler = async (req, res) => {
  const { uid } = req.session!;

  const { title, beginning, ending, color } = req.body;

  if (!title || !beginning || !ending) {
    return res.status(400).send('Invalid data');
  }

  await db
    .query('INSERT INTO notes(uid,title,beginning,ending, color) VALUES ($1,$2,$3,$4, $5)', [uid, title, beginning, ending, color])
    .catch(error(500, 'Database error'));

  return res.status(200).send('ok');
};

export const putNote: RequestHandler = (req, res) => {
  return res.status(200).send('ok');
};

export const deleteNote: RequestHandler = (req, res) => {
  return res.status(200).send('ok');
};
