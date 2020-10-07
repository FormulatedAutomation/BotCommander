import { Response } from 'node-fetch'
import RoboCloudAPI from '../services/robocloud'
import { Bot } from './Bot'
import { Job, JobState } from './Job'

export class RoboCloudJob extends Job {
  bot: Bot;
  service: RoboCloudAPI;
  runId: string;

  constructor (runId: string, bot: Bot) {
    super()
    this.bot = bot
    this.service = new RoboCloudAPI(bot)
    this.runId = runId
  }

  // Normalize the states
  state (state: string): JobState {
    if (state === 'COMPL') {
      return JobState.Complete
    } else if (state === 'PEND') {
      return JobState.Pending
    } else if (state === 'IP') {
      return JobState.Pending
    } else if (state === 'INI') {
      return JobState.Pending
    } else if (state === 'IND') {
      return JobState.Pending
    }
    return JobState.Failed
  }

  async properties () {
    const status = await this.service.status(this.runId)
    const state = this.state(status.state)
    let artifacts = []
    if (state === JobState.Complete) {
      artifacts = await this.artifacts(status.robotRuns[0].id)
    }
    return {
      id: this.runId,
      state: JobState[state],
      properties: status,
      artifacts,
    }
  }

  async artifacts (robotRunId: string): Promise<any[]> {
    return await this.service.artifacts(this.runId, robotRunId)
  }

  async getArtifact (robotRunId: string, artifactId: string, filename: string): Promise<Response> {
    return await this.service.getArtifact(this.runId, robotRunId, artifactId, filename)
  }
}
