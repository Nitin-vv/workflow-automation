import express from 'express';
import { createProperty, deleteProperty, getProperty, updateProperty, updateStatus } from '../controllers/property.controller';
import auth from '../middelwares/auth.middleware';


export const propertyRouter = express.Router();

propertyRouter.get( '/getProperties', auth, getProperty );
propertyRouter.post( '/createProperties', auth, createProperty );
propertyRouter.put( '/updateProperties', auth, updateProperty );
propertyRouter.put( '/updatePropertyStatus', auth, updateStatus );
propertyRouter.delete( '/deleteProperties', auth, deleteProperty );
