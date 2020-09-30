import { BotConfig } from '../../lib/config';
import logger from '../../lib/logging';
import UiPathAPI from '../services/uipath';
import { UiPathJob } from "./UiPathJob";
import { Bot } from "./Bot";
import { JobStartResponse } from "./Job";

export interface UiPathBotInfo {
  InputArguments: object
  OutputArguments: object
  State: string
  Key: string
}

export class UiPathBot extends Bot {
  api: UiPathAPI;
  botInfo: UiPathBotInfo;
  authenticated: boolean;

  constructor(botConfig: BotConfig, source: object) {
    super();
    if (!source.hasOwnProperty('clientId')) {
      logger.error("UiPath bot must have a valid credentials");
    }
    this.api = new UiPathAPI(source);
    this.id = botConfig.id;
    this.botConfig = botConfig;
    this.botInfo = null;
    this.authenticated = false;
  }


  async start(inputArgs: object): Promise<JobStartResponse> {
    await this.properties();
    const _result = (await this.api.start({
      startInfo: {
        ReleaseKey: this.botInfo.Key,
        RobotIds: [],
        JobsCount: 1,
        Strategy: 'JobsCount',
        InputArguments: JSON.stringify(inputArgs || {}),
      }
    }) as {value: any[]});
    return {
      runId: _result.value[0].Id,
      _result,
    };
  }

  // Deserialize odd fields like the inputs and outputs
  deserialize(jobInfoJSON: any): UiPathBotInfo {
    const result: UiPathBotInfo = Object.assign({}, jobInfoJSON)
    result.InputArguments = JSON.parse(jobInfoJSON.Arguments.Input);
    result.OutputArguments = JSON.parse(jobInfoJSON.Arguments.Output);
    return result
  }

  async properties(force?: boolean) {
    if (this.botInfo && !force) {
      return this.botInfo;
    }
    const botInfo = await this.api.findByProcessKey(this.id);
    this.botInfo = this.deserialize(botInfo);
    return this.botInfo;
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

  definition(): BotConfig {
    return this.botConfig;
  }

  getJob(jobId: string): UiPathJob {
    return new UiPathJob(jobId, this.api);
  }

}
