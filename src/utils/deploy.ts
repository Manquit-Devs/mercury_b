import { DeployStep } from "../database";

export const sortStepByOrder = (step1: DeployStep, step2: DeployStep) =>
    Number(step1.order > step2.order);