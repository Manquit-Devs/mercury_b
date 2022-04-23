import express from 'express';
import DeployController from '../controllers/deploy';

const publicRoutes = express.Router();
const deployController = new DeployController();

publicRoutes.post(
  '/deploy/build/run/github-webhook/:id/:secret',
  deployController.runBuildByGitHubWebHook
);

export default publicRoutes;
