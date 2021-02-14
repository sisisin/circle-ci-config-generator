import YAML from 'yaml';

export function parse(config: string): CircleCi.Config {
  return YAML.parse(config);
}
export function getWorkflows(config: CircleCi.Config): [string, CircleCi.Workflow][] {
  return Object.entries(config.workflows);
}
export function getJobs(config: CircleCi.Config, workflowKey: string): CCNode.WorkflowJob[] {
  return config.workflows[workflowKey].jobs.map((job) => {
    if (typeof job === 'string') {
      return { key: job, value: null };
    } else {
      const key = Object.keys(job)[0];
      return { key, value: job[key] };
    }
  });
}
export function getWorkflowJobDetail(workflowJobs: CCNode.WorkflowJob[], key: string) {
  return workflowJobs.find((j) => j.key === key)!;
}
export function getNext(workflowJobs: CCNode.WorkflowJob[], key: string): string[] {
  const result = workflowJobs
    .filter((job) => {
      if (job.key === key) return false;
      return job.value?.requires?.includes(key);
    })
    .map((job) => job.key);
  return result;
}
declare namespace CCNode {
  export type WorkflowJob = {
    key: string;
    value: CircleCi.Workflow.JobWithConditionBody | null;
  };
}
export declare namespace CircleCi {
  export type Config = {
    version: number;
    workflows: Record<string, Workflow>;
    jobs: Record<string, object>;
  };
  export type Workflow = {
    jobs: Workflow.Job[];
    triggers?: unknown; // todo
  };
  export namespace Workflow {
    export type JobOnlyName = string;
    export type JobWithCondition = Record<string, JobWithConditionBody>;
    export type JobWithConditionBody = {
      filters?: object[];
      requires?: string[];
      type?: 'approval';
      context?: unknown; // todo
    };
    export type Job = JobOnlyName | JobWithCondition;
  }
}
