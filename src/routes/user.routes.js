import express from 'express';
import UserController from '../controllers/user.controller.js';

import passport from 'passport';
import passportLocal from '../config/passport-local.js';


const router = express.Router();


router.post('/create-account', UserController.createUser)
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
), UserController.userSession);

router.get('/logout', UserController.destroySession)
export default router;