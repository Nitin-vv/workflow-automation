import express from 'express';
import { signup, login, forgotpassword, userInfo} from '../controllers/auth.controller'
import auth from '../middelwares/auth.middleware';


export const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/userInfo',auth, userInfo);
router.post('/forgotPassword', forgotpassword);
