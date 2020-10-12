import { BotConfig } from '../../lib/config'
import logger from '../../lib/logging'
import UiPathAPI, { deserializeArguments as deserializeUiPathArgs } from '../services/uipath'
import { UiPathJob } from './UiPathJob'
import { Bot } from './Bot'
import { JobStartResponse } from './Job'
import { BotObject, UiPathBotInfo } from './types'

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
    for (const inputArg of this.arguments.input) {
      if (inputArg.type === 'integer') {
        if (Object.hasOwnProperty.call(args, inputArg.name)) {
          args[inputArg.name] = parseInt(args[inputArg.name], 10)
        }
      }
    }
    return args
  }

  // Deserialize odd fields like the inputs and outputs
  deserializeArguments (jobInfoJSON: any): void {
    this.arguments = {
      input: deserializeUiPathArgs(jobInfoJSON.Arguments.Input),
      output: deserializeUiPathArgs(jobInfoJSON.Arguments.Output),
    }
  }

  async properties (force?: boolean): Promise<UiPathBotInfo> {
    if (this.botInfo && !force) {
      return this.botInfo
    }
    this.botInfo = await this.api.findByProcessKey(this.id)
    this.deserializeArguments(this.botInfo)
    return this.botInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

  // the object we pass back via API
  async toJSON (): Promise<BotObject> {
    const properties = await this.properties()
    const definition = this.definition()
    return {
      id: this.id,
      name: definition.name,
      description: definition.description,
      type: definition.type,
      source: definition.source,
      arguments: this.arguments,
      properties,
      definition,
    }
  }

  definition (): BotConfig {
    return this.botConfig
  }

  getJob (jobId: string): UiPathJob {
    return new UiPathJob(jobId, this.api)
  }
}
