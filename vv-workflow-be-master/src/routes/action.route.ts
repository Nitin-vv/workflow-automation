import express from 'express';
import { getActions } from '../controllers/action.controller';
import auth from '../middelwares/auth.middleware';

export const actionRouter = express.Router();

actionRouter.get( '/getActions', auth, getActions );
