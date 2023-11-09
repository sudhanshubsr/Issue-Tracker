import express from 'express';

import ProjectController from '../controllers/project.controller.js';

import passport from 'passport';
import passportLocal from '../config/passport-local.js';


const router = express.Router();


router.get('/create',passport.checkAuthentication,ProjectController.getProjectCreate);
router.get('/create-issue', ProjectController.getIssueCreate);
router.get('/detail/:id', passport.checkAuthentication, ProjectController.getProjecDetail);
router.get('/:id/new-issue', passport.checkAuthentication, ProjectController.getIssueCreate);

router.post('/create-project', passport.checkAuthentication,ProjectController.createProject);

router.post('/:id/create-issue', passport.checkAuthentication,ProjectController.createIssue);

router.get('/:id/delete-issue/:id', passport.checkAuthentication,ProjectController.deleteIssue);


router.post('/:id/search-issues',passport.checkAuthentication,ProjectController.filterIssues);

export default router;