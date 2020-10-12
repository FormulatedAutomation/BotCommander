import { BotConfig } from '../../lib/config'
import { Job } from './Job'
import { BotArgument, BotObject } from './types'

export abstract class Bot {
  abstract async properties(force?: boolean): Promise<object>;
  abstract definition(): object;
  abstract start(inputArgs: object): object;
  abstract getJob(jobId: string): Job;
  abstract async toJSON(): Promise<BotObject>;

  id: string;
  botConfig: BotConfig;
  arguments?: {
    input: BotArgument[],
    output: BotArgument[],
  }
}
