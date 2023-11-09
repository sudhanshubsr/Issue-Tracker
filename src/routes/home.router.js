import express from 'express';

import projectRouter from './project.routes.js';
import userRouter from './user.routes.js';

import homeController from '../controllers/home.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();


router.use('/project', projectRouter);
router.use('/user', userRouter);

router.get('/', homeController.getHome)
router.get('/sign-in', UserController.getSignInPage);
router.get('/sign-up', UserController.getSignUpPage);




export default router;