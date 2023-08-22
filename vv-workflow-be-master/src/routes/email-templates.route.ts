import express from 'express';
import { getEmailTemplates, createEmailTemplates, updateEmailTemplates, deleteEmailTemplates, updateStatus } from '../controllers/email-templates.controller';
import auth from '../middelwares/auth.middleware';


export const EmailRouter = express.Router();

EmailRouter.get( '/getEmailTemplates', auth, getEmailTemplates );
EmailRouter.post( '/createEmailTemplates', auth, createEmailTemplates );
EmailRouter.put( '/updateEmailTemplates', auth, updateEmailTemplates );
EmailRouter.delete( '/deleteEmailTemplates', auth, deleteEmailTemplates );
EmailRouter.put( '/updateStatus', auth, updateStatus );

