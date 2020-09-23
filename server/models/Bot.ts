import { OrchestratorApi } from 'uipath-orchestrator-api-node'
import { BotConfig } from '../../lib/config'
import RoboCloudAPI from '../services/robocloud'

export class Bot {

}

export class UiPathBot extends Bot {
  api: OrchestratorApi
  processName: string
  process: object
  processInfo: object
  authenticated: boolean

  constructor(processName: string, process: object, source: object) {
    super()
    this.api = new OrchestratorApi(source)
    this.processName = processName
    this.process = process
    this.processInfo = null
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
    await this.info()
    // _startJobs is private and the only way to start a "JobsCount" strategy
    // @ts-ignore
    return await this.api.job._startJobs({
        startInfo: {
          ReleaseKey: this.processInfo['Key'],
          RobotIds: [],
          JobsCount: 1,
          Strategy: 'JobsCount',
          InputArguments: JSON.stringify(inputArgs),
        }
      })
  }

  // Inplace deserialization
  deserializeArgs(): void {
    if (!this.processInfo) {
      throw "Must first fetch process info"
    }
    const args = this.processInfo['Arguments']
    args['Input'] = JSON.parse(args['Input'])
    args['Output'] = JSON.parse(args['Output'])
  }

  async info(force?: boolean) {
    if (this.processInfo && !force) {
      return this.processInfo
    }
    await this.authenticate()
    this.processInfo = await this.api.release.findByProcessKey(this.processName)
    this.deserializeArgs()
    return this.processInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }

}

export class RoboCloudBot extends Bot {
  bot: BotConfig
  botName: string
  service: RoboCloudAPI

  constructor(botName: string, bot: BotConfig) {
    super()
    this.botName = botName
    this.bot = bot
    this.service = new RoboCloudAPI(process)
  }

  async start(inputArgs: object) {
    return await this.service.start(inputArgs)
  }

}