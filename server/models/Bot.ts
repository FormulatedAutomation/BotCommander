import { BotConfig } from '../../lib/config'
import logger from '../../lib/logging'

import RoboCloudAPI from '../services/robocloud'
import UiPathAPI from '../services/uipath'
import { Job, RoboCloudJob, UiPathJob } from './Job'

export interface JobStartResponse {
  runId: string
  _result: any
}

export abstract class Bot {
  abstract async properties(force?: boolean): Promise<object>
  abstract definition(): object
  abstract getJob(jobId: string): Job
  id: string
  botConfig: BotConfig

  static createFromConfig(bot: BotConfig, sources: object): UiPathBot | RoboCloudBot {
    if (bot.type === 'uipath') {
      return new UiPathBot(bot, sources[bot.source])
    }
    if (bot.type === 'robocloud')
      return new RoboCloudBot(bot)
  }

}

export class UiPathBot extends Bot {
  api: UiPathAPI
  botInfo: object
  authenticated: boolean

  constructor(botConfig: BotConfig, source: object) {
    super()
    if (!source.hasOwnProperty('clientId')) {
      logger.error("UiPath bot must have a valid credentials")
    }
    this.api = new UiPathAPI(source)
    this.id = botConfig.id
    this.botConfig = botConfig
    this.botInfo = null
    this.authenticated = false
  }


  async start(inputArgs: object): Promise<JobStartResponse> {
    await this.properties()
    // _startJobs is private and the only way to start a "JobsCount" strategy
    // @ts-ignore
    const _result = await this.api.start({
        startInfo: {
          ReleaseKey: this.botInfo['Key'],
          RobotIds: [],
          JobsCount: 1,
          Strategy: 'JobsCount',
          InputArguments: JSON.stringify(inputArgs),
        }
      })
    return {
      runId: _result['value'][0].Id,
      _result,
    }
  }

  // Inplace deserialization
  deserializeArgs(): void {
    if (!this.botInfo) {
      throw "Must first fetch process info"
    }
    const args = this.botInfo['Arguments']
    args['Input'] = JSON.parse(args['Input'])
    args['Output'] = JSON.parse(args['Output'])
  }

  async properties(force?: boolean) {
    if (this.botInfo && !force) {
      return this.botInfo
    }
    this.botInfo = await this.api.findByProcessKey(this.id)
    this.deserializeArgs()
    return this.botInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

  definition(): BotConfig {
    return this.botConfig
  }

  getJob(jobId: string): UiPathJob {
    return new UiPathJob(jobId, this.api)
  }

}

export class RoboCloudBot extends Bot {
  api: RoboCloudAPI

  constructor(botConfig: BotConfig) {
    super()
    this.id = botConfig.id
    this.botConfig = botConfig
    this.api = new RoboCloudAPI(this)
  }

  async start(inputArgs: object): Promise<JobStartResponse> {
    const _result = await this.api.start(inputArgs)
    return {
      runId: _result.processRunId,
      _result
    }
  }

  async properties(force?: boolean) {
    // Need to get this from the API when it's available
    return {}
  }

  definition() {
    var clone = Object.assign({}, this.botConfig);
    // Drop the secret, this should never be revealed
    delete clone.secret
    return clone
  }

  getJob(jobId: string): RoboCloudJob {
    return new RoboCloudJob(jobId, this)
  }

}