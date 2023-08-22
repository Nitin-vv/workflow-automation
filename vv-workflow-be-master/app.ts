import express from 'express';
import { router } from './src/routes/auth.route'
import { propertyRouter } from './src/routes/property.route'
import { SmsRouter } from './src/routes/sms-templates.route'
import { EmailRouter } from './src/routes/email-templates.route'
import { WorkflowRouter } from './src/routes/workflows.route'
import cors from 'cors';
import bodyParser from 'body-parser';
import { actionRouter } from './src/routes/action.route';
import { WorkflowScheduleRouter } from './src/routes/workflow-schedules.route';

const app = express();
app.use( cors( { origin: '*' } ) );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json( { limit: '100mb' } ) );

export const startServer = ( port: any ) => {
  app.use( express.json() );
  app.use( "/api/auth", router );
  app.use( "/api/property", propertyRouter );
  app.use( "/api/sms", SmsRouter );
  app.use( "/api/email", EmailRouter );
  app.use( "/api/workflow", WorkflowRouter );
  app.use( "/api/action", actionRouter );
  app.use( "/api/schedule", WorkflowScheduleRouter );

  app.listen( port, () => {
    console.log( `listening at http://localhost:${ port }` )
  } );
}


