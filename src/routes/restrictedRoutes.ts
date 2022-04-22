import express from 'express';
import AuthController from '../controllers/auth';
import DeployController from '../controllers/deploy';
import StepController from '../controllers/step';

const restrictedRoutes = express.Router();
const deployController = new DeployController();
const stepController = new StepController();
const authController = new AuthController();

restrictedRoutes.get('/deploys', deployController.index);
restrictedRoutes.get('/deploy/:id', deployController.show);
restrictedRoutes.post('/deploy', deployController.create);
restrictedRoutes.put('/deploy/:id', deployController.update);
restrictedRoutes.delete('/deploy/:id', deployController.delete);

restrictedRoutes.get('/deploy/step/types', stepController.getStepTypes);

restrictedRoutes.get('/verifyToken', authController.verifyToken);
export default restrictedRoutes;
