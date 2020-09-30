
export enum JobState {
  Complete,
  Pending,
  Failed,
}

export interface JobStartResponse {
  runId: string
  _result: any
}

export abstract class Job {
  abstract async properties(): Promise<object>
}


