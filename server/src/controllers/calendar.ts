import db from '../db/db';
import { RequestHandler } from 'express';
import { error } from '../helpers/errors';

export const getNotes: RequestHandler = (req, res) => {
  return res.status(200).send('ok');
};

export const postNote: RequestHandler = (req, res) => {
  const { uid } = req.session!;

  const data = {
    title: '.',
    description: '..',
    start: '2019-08-11',
    end: '2019-04-23'
  };

  db.query('INSERT INTO notes(uid,title,description,start_date,end_date) VALUES ($1,$2,$3,$4,$5)', [uid, data.title, data.description, data.start, data.end]).catch(
    error(500, 'Database error')
  );

  return res.status(200).send('ok');
};

export const putNote: RequestHandler = (req, res) => {
  return res.status(200).send('ok');
};

export const deleteNote: RequestHandler = (req, res) => {
  return res.status(200).send('ok');
};
