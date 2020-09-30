import { BotConfig } from '../../lib/config';
import RoboCloudAPI from '../services/robocloud';
import { RoboCloudJob } from "./RoboCloudJob";
import { Bot } from "./Bot";
import { JobStartResponse } from "./Job";


export class RoboCloudBot extends Bot {
  api: RoboCloudAPI;

  constructor(botConfig: BotConfig) {
    super();
    this.id = botConfig.id;
    this.botConfig = botConfig;
    this.api = new RoboCloudAPI(this);
  }

  async start(inputArgs: object): Promise<JobStartResponse> {
    const _result = await this.api.start(inputArgs);
    return {
      runId: _result.processRunId,
      _result
    };
  }

  async properties(force?: boolean) {
    // Need to get this from the API when it's available
    return {};
  }

  definition() {
    const clone = Object.assign({}, this.botConfig);
    // Drop the secret, this should never be revealed
    delete clone.secret;
    return clone;
  }

  getJob(jobId: string): RoboCloudJob {
    return new RoboCloudJob(jobId, this);
  }

}
