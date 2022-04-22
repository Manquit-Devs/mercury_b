import express from 'express';
import DeployController from '../controllers/deploy';
import StepController from '../controllers/step';

const restrictedRoutes = express.Router();
const deployController = new DeployController();
const stepController = new StepController();

restrictedRoutes.get('/deploys', deployController.index);
restrictedRoutes.get('/deploy/:id', deployController.show);
restrictedRoutes.post('/deploy', deployController.create);
restrictedRoutes.put('/deploy/:id', deployController.update);
restrictedRoutes.delete('/deploy/:id', deployController.delete);
restrictedRoutes.post(
  '/deploy/github-webhook/:id',
  deployController.buildByGitHubWebHook
);

restrictedRoutes.get('/deploy/step/types', stepController.getStepTypes);

export default restrictedRoutes;
