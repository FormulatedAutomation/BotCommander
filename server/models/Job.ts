
export enum JobState {
  Complete,
  Pending,
  Failed,
  Running,
}

export interface JobStartResponse {
  runId: string
  _result: any
}

export abstract class Job {
  abstract async toJSON(): Promise<object>
  arguments?: {
    input: any[],
    output: any[],
  }
}
