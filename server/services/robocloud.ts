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
    const result = await fetch(
      `https://api.eu1.robocloud.eu/workspace-v1/workspaces/${this.workspaceId}/processes/${this.processId}/runs/${id}`,
      options
    )
    return await result.json()
  }

}