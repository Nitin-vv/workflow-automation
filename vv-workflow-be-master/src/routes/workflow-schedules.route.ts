import express from 'express';
import { getWorkflowSchedule, createWorkflowSchedule, updateWorkflowSchedule, deleteWorkflowSchedule, updateStatusSchedule } from '../controllers/workflow-schedules.controller';
import auth from '../middelwares/auth.middleware';


export const WorkflowScheduleRouter = express.Router();

WorkflowScheduleRouter.get( '/getWorkflowSchedule', auth, getWorkflowSchedule );
WorkflowScheduleRouter.post( '/createWorkflowSchedule', auth, createWorkflowSchedule );
WorkflowScheduleRouter.put( '/updateWorkflowSchedule', auth, updateWorkflowSchedule );
WorkflowScheduleRouter.delete( '/deleteWorkflowSchedule', auth, deleteWorkflowSchedule );
WorkflowScheduleRouter.put( '/updateStatusSchedule', auth, updateStatusSchedule );

