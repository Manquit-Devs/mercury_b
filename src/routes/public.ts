import express from 'express';
import { Request, Response } from 'express';
import DeployController from '../controllers/deploy';
import StepController from '../controllers/step';

const routes = express.Router();
const deployControllers = new DeployController();
const stepControllers = new StepController();

routes.get('/deploys', deployControllers.index);
routes.get('/deploy/:id', deployControllers.show);
routes.post('/deploy', deployControllers.create);
routes.put('/deploy/:id', deployControllers.update);
routes.delete('/deploy/:id', deployControllers.delete);
routes.post('/deploy/github-webhook/:id', deployControllers.buildByGitHubWebHook);

routes.get('/deploy/step/types', stepControllers.getStepTypes);

export default routes;