import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRouter from './routes/users';
import PasswordRouter from './routes/passwords';
import CalendarRouter from './routes/calendar';
import expressSession from 'express-session';
import pgSession from 'connect-pg-simple';
import { pool } from './db/db';

const app = express();
const postgresSession = pgSession(expressSession);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(
  expressSession({
    secret: process.env.EXPRESS_SECRET as string,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    name: 'SID',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    },
    store: new postgresSession({
      pool: pool,
      tableName: 'session'
    })
  })
);

app.use('/users', UserRouter);
app.use('/users/:id/calendar', CalendarRouter);

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log('Server listening on port', port);
});
