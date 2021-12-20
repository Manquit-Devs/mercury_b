import express from 'express';
import { Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => res.status(200).json("Hello world!"));

export default routes;