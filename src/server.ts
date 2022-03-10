import express from 'express';
import publicRoutes from './routes/public';
import cors from 'cors';
import DeployController from './controllers/deploy';

const app = express();
const deployControllers = new DeployController();
deployControllers.runSteps(12);

app.use(express.json());
app.use(cors());
app.use('/', publicRoutes);

app.listen(3333);
