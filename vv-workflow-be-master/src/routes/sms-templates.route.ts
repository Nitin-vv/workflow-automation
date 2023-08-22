import express from 'express';
import { createSmsTemplates, deleteSmsTemplates, getSmsTemplates, updateSmsTemplates, updateStatus } from '../controllers/sms-templates.controller';
import auth from '../middelwares/auth.middleware';


export const SmsRouter = express.Router();

SmsRouter.get( '/getSmsTemplates', auth, getSmsTemplates );
SmsRouter.post( '/createSmsTemplates', auth, createSmsTemplates );
SmsRouter.put( '/updateSmsTemplates', auth, updateSmsTemplates );
SmsRouter.delete( '/deleteSmsTemplates', auth, deleteSmsTemplates );
SmsRouter.put( '/updateStatus', auth, updateStatus );

