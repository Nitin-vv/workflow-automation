import express from 'express';
import { getWorkflow, createWorkflow, updateWorkflow, deleteWorkflow, updateStatus } from '../controllers/workflows.controller';
import auth from '../middelwares/auth.middleware';


export const WorkflowRouter = express.Router();

WorkflowRouter.get( '/getWorkflow', auth, getWorkflow );
WorkflowRouter.post( '/createWorkflow', auth, createWorkflow );
WorkflowRouter.put( '/updateWorkflow', auth, updateWorkflow );
WorkflowRouter.delete( '/deleteWorkflow', auth, deleteWorkflow );
WorkflowRouter.put( '/updateStatus', auth, updateStatus );

