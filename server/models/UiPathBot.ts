import { BotConfig } from '../../lib/config'
import logger from '../../lib/logging'
import UiPathAPI from '../services/uipath'
import { UiPathJob } from './UiPathJob'
import { Bot } from './Bot'
import { JobStartResponse } from './Job'

export interface UiPathInputArgument {
  name: string
  type: string
  [key: string]: any
}

export interface UiPathBotInfo {
  InputArguments: UiPathInputArgument[]
  OutputArguments: []
  State: string
  Key: string
}

export class UiPathBot extends Bot {
  api: UiPathAPI;
  botInfo: UiPathBotInfo;
  authenticated: boolean;

  constructor (botConfig: BotConfig, source: object) {
    super()
    if (!Object.hasOwnProperty.call(source, 'clientId')) {
      logger.error('UiPath bot must have a valid credentials')
    }
    this.api = new UiPathAPI(source)
    this.id = botConfig.id
    this.botConfig = botConfig
    this.botInfo = null
    this.authenticated = false
  }

  async start (inputArgs: object | null): Promise<JobStartResponse> {
    inputArgs = inputArgs || {}
    await this.properties()
    inputArgs = this.serializeArguments(inputArgs)
    const startInfo = {
      ReleaseKey: this.botInfo.Key,
      RobotIds: [],
      JobsCount: 1,
      Strategy: 'JobsCount',
      InputArguments: JSON.stringify(inputArgs || {}),
    }
    const _result = (await this.api.start({
      startInfo,
    }) as {value: any[]})
    return {
      runId: _result.value[0].Id,
      _result,
    }
  }

  serializeArguments (args: object): object {
    for (const inputArg of this.botInfo.InputArguments) {
      if (inputArg.type === 'integer') {
        if (Object.hasOwnProperty.call(args, inputArg.name)) {
          args[inputArg.name] = parseInt(args[inputArg.name], 10)
        }
      }
    }
    return args
  }

  // Deserialize odd fields like the inputs and outputs
  deserializeArguments (jobInfoJSON: any): UiPathBotInfo {
    const result: UiPathBotInfo = Object.assign({}, jobInfoJSON)
    result.InputArguments = JSON.parse(jobInfoJSON.Arguments.Input)
    result.OutputArguments = JSON.parse(jobInfoJSON.Arguments.Output)
    for (const argument of result.InputArguments) {
      if (/^System.Int32/.test(argument.type)) {
        argument.type = 'integer'
      }
    }
    return result
  }

  async properties (force?: boolean) {
    if (this.botInfo && !force) {
      return this.botInfo
    }
    const botInfo = await this.api.findByProcessKey(this.id)
    this.botInfo = this.deserializeArguments(botInfo)
    return this.botInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

  definition (): BotConfig {
    return this.botConfig
  }

  getJob (jobId: string): UiPathJob {
    return new UiPathJob(jobId, this.api)
  }
}
