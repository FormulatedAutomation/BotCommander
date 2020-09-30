import { BotConfig } from '../../lib/config';
import { Job } from './Job';

export abstract class Bot {
  abstract async properties(force?: boolean): Promise<object>;
  abstract definition(): object;
  abstract getJob(jobId: string): Job;
  id: string;
  botConfig: BotConfig;
}
