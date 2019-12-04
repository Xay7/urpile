import { Router } from 'express';
import * as CalendarController from '../controllers/calendar';
import { validateSession } from '../middlewares/validation';

const router = Router();

router
  .route('/')
  .get(validateSession, CalendarController.getNotes)
  .post(validateSession, CalendarController.postNote)
  .put(validateSession, CalendarController.putNote)
  .delete(validateSession, CalendarController.deleteNote);

export default router;
