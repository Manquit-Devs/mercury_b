import { Request, Response } from 'express';
import db, { StepType } from '../database';

export default class StepController{
  async getStepTypes(req: Request, res: Response){
    try {
      const stepTypes = await db<StepType>('step_types').select();
      res.status(200).json(stepTypes);
    } catch (error) {
      console.log(error);
    }
  }
}