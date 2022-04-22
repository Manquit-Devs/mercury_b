import express from 'express';
import DeployController from '../controllers/deploy';

const publicRoutes = express.Router();
const deployController = new DeployController();

publicRoutes.post(
  '/deploy/github-webhook/:id',
  deployController.buildByGitHubWebHook
);

export default publicRoutes;
