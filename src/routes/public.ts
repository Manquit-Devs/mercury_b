import express from 'express';
import { Request, Response } from 'express';
import DeployController from '../controllers/deploy';

const routes = express.Router();
const deployControllers = new DeployController();

routes.get('/deploys', deployControllers.index);
routes.get('/deploy/:id', deployControllers.show);
routes.post('/deploy', deployControllers.create);
routes.put('/deploy/:id', deployControllers.update);
routes.delete('/deploy/:id', deployControllers.delete);

export default routes;