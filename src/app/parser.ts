import YAML from 'yaml';

export function parse(config: string): CircleCi.Config {
  return YAML.parse(config);
}

export function toJsonGraph(config: CircleCi.Config, key: string): JsonGraph {
  const jobs = getJobs(config, key);
  const graph = makeGraph(jobs);
  setPosition(graph);

  return graph;
}
function setPosition({ edges, nodes }: JsonGraph) {
  const allOfTargets = new Set(edges.map((e) => e.target));
  const allOfSources = new Map(edges.map((e) => [e.source, e]));
  const firstNodes = nodes.filter((node) => !allOfTargets.has(node.id));

  let y = 0;
  firstNodes.forEach((node) => {
    node.position = { x: 0, y };
    y += 50;
  });

  firstNodes.forEach((node) => {
    const nextId = allOfSources.get(node.id)!.target;
    const next = nodes.find((node) => node.id === nextId)!;
    if (next.position.x === undefined) {
      next.position.x = node.position.x! + 220;
    }
    if (next.position.y === undefined) {
      next.position.y = 0;
    }
  });

  return { edges, nodes };
}

function makeGraph(jobs: CCNode.WorkflowJob[]) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  jobs.forEach((job) => {
    const node: Node = { id: job.key, label: job.key, position: {} };
    job.value?.requires?.forEach((requireJob) => {
      const edge: Edge = { source: requireJob, target: job.key };
      edges.push(edge);
    });
    nodes.push(node);
  });
  return { nodes, edges };
}

type JsonGraph = { edges: Edge[]; nodes: Node[] };
type Edge = { source: string; target: string };
type Node = { id: string; label: string; position: { x?: number; y?: number } };
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
