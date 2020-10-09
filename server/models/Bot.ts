import { BotConfig } from '../../lib/config'
import { Job } from './Job'

export interface BotArgument {
  name: string
  type: string
  [key: string]: any
}

export abstract class Bot {
  abstract async properties(force?: boolean): Promise<object>;
  abstract definition(): object;
  abstract start(inputArgs: object): object;
  abstract getJob(jobId: string): Job;
  id: string;
  botConfig: BotConfig;
  arguments?: {
    inputs: BotArgument[],
    outputs: BotArgument[],
  }
}
