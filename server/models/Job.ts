import { Response } from 'node-fetch'
import { OrchestratorApi } from 'uipath-orchestrator-api-node'
import { BotConfig } from '../../lib/config'
import RoboCloudAPI from '../services/robocloud'

export enum JobState {
  Complete,
  Pending,
  Failed,
}


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

  // Normalize the states
  state(state: string): JobState {
    if (state === 'Successful') {
      return JobState.Complete
    } else if (state === 'Pending') {
      return JobState.Pending
    }
    return JobState.Failed
  }

  async properties(force?: boolean) {
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
    if (this.jobInfo && !force) {
      return this.jobInfo
    }
    await this.authenticate()
    this.jobInfo = await this.api.job.find(this.jobKey)
    console.log(this.jobInfo)
    this.deserializeArgs()
    return  {
      id: this.jobKey,
      state: JobState[this.state(this.jobInfo['State'])],
      info: this.jobInfo
    }
  }


}


export class RoboCloudJob extends Job {

  bot: BotConfig
  botName: string
  service: RoboCloudAPI
  runId: string

  constructor(botName: string, bot: BotConfig, runId: string) {
    super()
    this.botName = botName
    this.bot = bot
    this.service = new RoboCloudAPI(bot)
    this.runId = runId
  }

  // Normalize the states
  state(state: string): JobState {
    if (state === 'COMPL') {
      return JobState.Complete
    } else if (state === 'PEND') {
      return JobState.Pending
    }
    return JobState.Failed
  }

  async properties() {
    const status = await this.service.status(this.runId)
    const state = this.state(status['state'])
    let artifacts = []
    if (state === JobState.Complete) {
      console.log("Completed")
      artifacts = await this.artifacts(status['robotRuns'][0]['id'])
    }
    return {
      id: this.runId,
      state: JobState[state],
      properties: status,
      artifacts,
    }
  }

  async artifacts(robotRunId: string): Promise<any[]> {
    return await this.service.artifacts(this.runId, robotRunId)
  }

  async getArtifact(robotRunId: string, artifactId: string, filename:string): Promise<Response> {
    return await this.service.getArtifact(this.runId, robotRunId, artifactId, filename)
  }

}