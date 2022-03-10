import { exec } from 'child_process';
import db, { Deploy, DeployStep, StepCommand } from '../database';
import { sortStepByOrder } from '../utils/deploy';

export const runSteps = async (deployId: number) => {
  try {
    const deploy = await db<Deploy>('deploy').where('id', deployId);
    const steps = await db<DeployStep>('deploy_step').where('deployId', deployId);
    const stepsOrdered = steps.sort(sortStepByOrder);
    for (const step of stepsOrdered) {
      const stepCommand = (
        await db<StepCommand>('step_command').where('stepId', step.id)
      )[0];
      exec(
        `cd ${deploy[0].workingDirectory} && ${stepCommand.command}`,
        (error, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
            if (error !== null) {
            console.log(`exec error: ${error}`);
            throw error;
          }
        }
      );
    }
  } catch (error) {
    throw error;
  }
};
