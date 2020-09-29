import { OrchestratorApi } from 'uipath-orchestrator-api-node'
import { BotConfig } from '../../lib/config'
import RoboCloudAPI from '../services/robocloud'

export abstract class Bot {
  abstract async properties(force?: boolean): Promise<object>
  abstract definition(): object
  id: string
  botConfig: BotConfig

  static instantiateBot(bot: BotConfig, sources: object): UiPathBot | RoboCloudBot {
    if (bot.type === 'uipath') {
      return new UiPathBot(bot, sources[bot.source])
    }
    if (bot.type === 'robocloud')
      return new RoboCloudBot(bot)
  }

}

export class UiPathBot extends Bot {
  api: OrchestratorApi
  botInfo: object
  authenticated: boolean

  constructor(botConfig: BotConfig, source: object) {
    super()
    this.api = new OrchestratorApi(source)
    this.id = botConfig.id
    this.botConfig = botConfig
    this.botInfo = null
    this.authenticated = false
  }

  async authenticate() {
    if (!this.authenticated) {
      await this.api.authenticate()
      this.authenticated = true
    }
  }

  async start(inputArgs: object) {
    await this.authenticate()
    await this.properties()
    // _startJobs is private and the only way to start a "JobsCount" strategy
    // @ts-ignore
    return await this.api.job._startJobs({
        startInfo: {
          ReleaseKey: this.botInfo['Key'],
          RobotIds: [],
          JobsCount: 1,
          Strategy: 'JobsCount',
          InputArguments: JSON.stringify(inputArgs),
        }
      })
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
    await this.authenticate()
    this.botInfo = await this.api.release.findByProcessKey(this.id)
    this.deserializeArgs()
    return this.botInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

  definition(): BotConfig {
    return this.botConfig
  }

}

export class RoboCloudBot extends Bot {
  service: RoboCloudAPI

  constructor(botConfig: BotConfig) {
    super()
    this.id = botConfig.id
    this.botConfig = botConfig
    this.service = new RoboCloudAPI(botConfig)
  }

  async start(inputArgs: object) {
    return await this.service.start(inputArgs)
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

}