import { Router } from 'express';
import * as githubController from '../controllers/github';

const router = Router();

router.get('/user-repos', githubController.getGitHubData);

export default router;
