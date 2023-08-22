/* eslint-disable no-console */
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config';

interface Db {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Users: any;
  Property: any;
  SMS: any;
  EMAIL: any;
  WORKFLOW: any;
  WORKFLOWSCHEDULES: any;
  ACTION: any;
}

const db: Db = {} as Db;
// db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = require( '../models/signup.model' )( sequelize, DataTypes );
db.Property = require( '../models/property.model' )( sequelize, DataTypes );
db.SMS = require( '../models/sms-templates.model' )( sequelize, DataTypes );
db.EMAIL = require( '../models/email-templates.model' )( sequelize, DataTypes );
db.WORKFLOW = require( '../models/workflows.model' )( sequelize, DataTypes );
db.WORKFLOWSCHEDULES = require( '../models/workflow-schedule.model' )( sequelize, DataTypes );
db.ACTION = require( "../models/action.model" )( sequelize, DataTypes )

export default db;
