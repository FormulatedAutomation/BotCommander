import { OrchestratorApi } from 'uipath-orchestrator-api-node'
import { BotConfig } from '../../lib/config'
import RoboCloudAPI from '../services/robocloud'

export class Job {

}

export class UiPathJob extends Job {
  api: OrchestratorApi
  jobKey: string
  authenticated: boolean
  jobInfo: object

  constructor(jobKey: string, source: object) {
    super()
    this.api = new OrchestratorApi(source)
    this.jobKey = jobKey
    this.authenticated = false
  }

  async authenticate() {
    if (!this.authenticated) {
      await this.api.authenticate()
      this.authenticated = true
    }
  }

  // Inplace deserialization
  deserializeArgs(): void {
    if (!this.jobInfo) {
      throw "Must first fetch process info"
    }
    this.jobInfo['InputArguments'] = JSON.parse(this.jobInfo['InputArguments'])
    this.jobInfo['OutputArguments'] = JSON.parse(this.jobInfo['OutputArguments'])
  }

  async info(force?: boolean) {
    if (this.jobInfo && !force) {
      return this.jobInfo
    }
    await this.authenticate()
    this.jobInfo = await this.api.job.find(this.jobKey)
    console.log(this.jobInfo)
    this.deserializeArgs()
    return this.jobInfo
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
  }


}


export class RoboCloudJob extends Job {

  bot: BotConfig
  processName: string
  service: RoboCloudAPI
  runId: string

  constructor(processName: string, bot: BotConfig, runId: string) {
    super()
    this.processName = processName
    this.bot = bot
    this.service = new RoboCloudAPI(process)
    this.runId = runId
  }

  async info() {
    return await this.service.status(this.runId)
  }

}