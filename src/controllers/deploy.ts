import { Request, Response } from 'express';
import db, {
  BuildStatus,
  Deploy,
  DeployBuild,
  DeployStep,
  StepCommand,
} from '../database/';
import { runSteps } from '../module/deploy';

interface DeployGetBody {
  id: number;
  name: string;
  description: string;
  workingDirectory: string;
  steps: Array<DeployStepBody>;
  builds: Array<DeployBuild & BuildStatus>;
}

interface DeployStepBody {
  id: number;
  order: number;
  name: string;
  typeId: number;
  args?: StepCommand;
}

interface DeployCreateBody {
  name: string;
  description: string;
  workingDirectory: string;
  branch: string;
  steps: Array<DeployStepBody>;
}

interface DeployUpdateBody {
  name: string;
  description: string;
  workingDirectory: string;
}

export default class DeployController {
  async index(req: Request, res: Response) {
    try {
      const response = Array<DeployGetBody>();
      const deploys = await db<Deploy>('deploy').select();

      for (const deploy of deploys as Array<DeployGetBody>) {
        const deployBuilds = await db<DeployBuild>('deploy_build')
          .join<BuildStatus>(
            'build_status',
            'build_status.id',
            'deploy_build.statusId'
          )
          .select()
          .where('deployId', deploy.id);
        deploy.builds = deployBuilds;
        const deploySteps = await db<DeployStep>('deploy_step')
          .select()
          .where('deployId', deploy.id);

        for (const step of deploySteps as Array<DeployStepBody>) {
          switch (step.typeId) {
            case 1:
              const stepCommand = await db<StepCommand>('step_command')
                .select()
                .where('stepId', step.id);
              step.args = stepCommand[0];
              break;
            default:
              break;
          }
        }

        deploy.steps = deploySteps;

        response.push(deploy);
      }

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let response = <DeployGetBody>{};
      const deploy = (await db<Deploy>('deploy').select().where('id', id))[0];

      response = { ...response, ...deploy };
      const deployBuilds = await db<DeployBuild>('deploy_build')
        .join<BuildStatus>(
          'build_status',
          'build_status.id',
          'deploy_build.statusId'
        )
        .select()
        .where('deployId', deploy.id);
      response.builds = deployBuilds;
      const deploySteps = await db<DeployStep>('deploy_step')
        .select()
        .where('deployId', deploy.id);

      for (const step of deploySteps as unknown as Array<DeployStepBody>) {
        switch (step.typeId) {
          case 1:
            const stepCommand = await db<StepCommand>('step_command')
              .select()
              .where('stepId', step.id);
            step.args = stepCommand[0];
            break;
          default:
            break;
        }
      }

      response.steps = deploySteps;
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async create(req: Request, res: Response) {
    const { name, description, workingDirectory, branch, steps } =
      req.body as DeployCreateBody;
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();

    try {
      const [deployId] = await trx('deploy').insert({
        name,
        branch,
        description,
        workingDirectory,
      });

      for (const step of steps) {
        const [stepId] = await trx<DeployStep>('deploy_step').insert({
          name: step.name,
          order: step.order,
          typeId: step.typeId,
          deployId,
        });
        switch (step.typeId) {
          case 1:
            await trx<StepCommand>('step_command').insert({
              command: step.args?.command,
              stepId,
            });
            break;

          default:
            break;
        }
      }

      await trx.commit();
      return res.status(201).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send();
    }
  }

  async update(req: Request, res: Response) {
    const { name, description, workingDirectory } = <DeployUpdateBody>req.body;
    const { id } = req.params;
    try {
      await db<Deploy>('deploy')
        .update({ name, description, workingDirectory })
        .where('id', id);
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    try {
      await trx<DeployBuild>('deploy_build').delete().where('deployId', id);
      await trx<DeployStep>('deploy_step').delete().where('deployId', id);
      await trx<Deploy>('deploy').delete().where('id', id);
      await trx.commit();
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send();
    }
  }

  async buildByGitHubWebHook(req: Request, res: Response) {
    res.status(200).send();
    const trxProvider = await db.transactionProvider();
    const trx = await trxProvider();
    const { id } = req.params;
    const { commits } = req.body;
    const build: DeployBuild = {
      commit: commits[0].id,
      sender: commits[0].author.name,
      date: new Date(),
      deployId: Number(id),
      statusId: 2,
    };
    try {
      const [buildId] = await trx('deploy_build').insert(build);
      try {
        runSteps(Number(id));
        await trx('deploy_build').update({ statusId: 3 }).where('id', buildId);
      } catch (error) {
        await trx('deploy_build').update({ statusId: 4 }).where('id', buildId);
        console.log(error);
      } finally {
        await trx.commit();
      }
    } catch (error) {
      await trx.rollback();
      console.log(error);
    }
  }
}
