import { exec } from 'child_process';
import db, { Deploy, DeployBuild, DeployStep, StepCommand } from '../database';
import { sortStepByOrder } from '../utils/deploy';

const onStepFinishHandler = async (
  error: Error | null,
  stdout: string | Buffer,
  stderr: string | Buffer,
  buildId: number
) => {
  const trxProvider = await db.transactionProvider();
  const trx = await trxProvider();
  console.log(stdout);
  console.log(stderr);
  try {
    if (error) {
      await trx('deploy_build').update({ statusId: 4 }).where('id', buildId);
    } else {
      await trx('deploy_build').update({ statusId: 3 }).where('id', buildId);
    }
    await trx.commit();
  } catch (error) {
    await trx.rollback();
  }
};

export const runSteps = async (deployId: number, buildId: number) => {
  const deploy = await db<Deploy>('deploy').where('id', deployId);
  const steps = await db<DeployStep>('deploy_step').where('deployId', deployId);
  const stepsOrdered = steps.sort(sortStepByOrder);
  for (const step of stepsOrdered) {
    const stepCommand = (
      await db<StepCommand>('step_command').where('stepId', step.id)
    )[0];

    exec(
      `cd ${deploy[0].workingDirectory} && ${stepCommand.command}`,
      (error, stdout, stderr) =>
        onStepFinishHandler(error, stdout, stderr, buildId)
    );
  }
};

export const runFirstBuild = async (deployId: number, username: string) => {
  await runBuild(deployId, username, 'First Build');
};

export const runBuildLastCommit = async (
  deployId: number,
  username: string
) => {
  const lastBuild = await db<DeployBuild>('deploy_build')
    .first()
    .where('deployId', deployId)
    .orderBy('date', 'asc');
  if (lastBuild) {
    await runBuild(deployId, lastBuild.sender, lastBuild.commit);
  } else {
    await runFirstBuild(deployId, username);
  }
};

export const runBuild = async (
  deployId: number,
  username: string,
  commit: string
) => {
  const trxProvider = await db.transactionProvider();
  const trx = await trxProvider();
  const build: DeployBuild = {
    commit,
    sender: username,
    date: new Date(),
    deployId: deployId,
    statusId: 2,
  };
  const [buildId] = await trx('deploy_build').insert(build);
  await trx.commit();
  await runSteps(deployId, buildId);
};
