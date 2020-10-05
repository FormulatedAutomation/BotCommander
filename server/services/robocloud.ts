import fetch from 'node-fetch'
import { Bot } from '../models/Bot'

export default class RoboCloudAPI {
  secret: string
  workspaceId: string
  processId: string

  constructor (bot: Bot) {
    this.secret = bot.botConfig.secret
    this.workspaceId = bot.botConfig.workspaceId
    this.processId = bot.botConfig.processId
  }

  async start (args: object) {
    const options = {
      method: 'POST',
      body: JSON.stringify(args || {}),
      headers: {
        'Content-Type': 'application/json',
        'robocloud-process-secret': this.secret,
      },
    }
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs`,
      options,
    )
    return await result.json()
  }

  async status (id: string) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'robocloud-process-secret': this.secret,
      },
    }
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${id}`,
      options,
    )
    return await result.json()
  }

  async artifacts (runId: string, robotRunId: string) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'robocloud-process-secret': this.secret,
      },
    }
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${runId}/robotRuns/${robotRunId}/artifacts`,
      options,
    )
    return await result.json()
  }

  async getArtifact (runId: string, robotRunId: string, artifactId: string, filename: string) {
    const options = {
      method: 'GET',
      headers: {
        'robocloud-process-secret': this.secret,
      },
    }
    return await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${runId}/robotRuns/${robotRunId}/artifacts/${artifactId}/${filename}`,
      options,
    )
  }
}
