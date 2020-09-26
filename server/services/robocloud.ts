import fetch from 'node-fetch'

export default class RoboCloudAPI {
  secret: string
  workspaceId: string
  processId: string

  constructor(opts: object) {
    this.secret = opts['secret']
    this.workspaceId = opts['workspaceId']
    this.processId = opts['processId']
  }

  async start(args: object) {
    console.log(args)
    console.log(this.secret, this.workspaceId)
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
      options
    )
    return await result.json()
  }

  async status(id: string) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'robocloud-process-secret': this.secret,
      },
    }
    console.log(options)
    console.log(this.processId)
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${id}`,
      options
    )
    return await result.json()
  }

  async artifacts(runId: string, robotRunId: string) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'robocloud-process-secret': this.secret,
      },
    }
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${runId}/robotRuns/${robotRunId}/artifacts`,
      options
    )
    return await result.json()
  }

  async getArtifact(runId: string, robotRunId: string, artifactId: string, filename: string) {
    const options = {
      method: 'GET',
      headers: {
        'robocloud-process-secret': this.secret,
      },
    }
    console.log(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${runId}/robotRuns/${robotRunId}/artifacts/${artifactId}/${filename}`
    )
    return await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${runId}/robotRuns/${robotRunId}/artifacts/${artifactId}/${filename}`,
      options
    )
  }


}