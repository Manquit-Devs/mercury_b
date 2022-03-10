import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./mercurydb.sqlite"
  }
});

export interface Deploy {
  id?: number;
  name: string;
  description: string;
  branch: string;
  workingDirectory: string;
}

export interface DeployStep {
  id?: number;
  order: number;
  name: string;
  typeId: number;
  deployId: number;
}

export interface DeployBuild {
  id?: number;
  commit: string;
  sender: string;
  date: Date;
  deployId: number;
  statusId: number;
}

export interface BuildStatus{
  id?: number;
  name: string;
}

export interface StepType{
  id?: number;
  name: string;
}

export interface StepCommand{
  id?: number;
  command: string;
  stepId: number;
}

export default db;