import { BotConfig } from '../../lib/config'
import RoboCloudAPI from '../services/robocloud'
import { RoboCloudJob } from './RoboCloudJob'
import { Bot } from './Bot'
import { JobStartResponse } from './Job'
import { BotObject } from './types'

export class RoboCloudBot extends Bot {
  api: RoboCloudAPI;

  constructor (botConfig: BotConfig) {
    super()
    this.id = botConfig.id
    this.botConfig = botConfig
    this.api = new RoboCloudAPI(this)
    this.arguments = botConfig.arguments
  }

  async start (inputArgs: object): Promise<JobStartResponse> {
    const _result = await this.api.start(inputArgs)
    return {
      runId: _result.processRunId,
      _result,
    }
  }

  async properties () {
    return {}
  }

  definition () {
    const clone = Object.assign({}, this.botConfig)
    // Drop the secret, this should never be revealed
    delete clone.secret
    return clone
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
      arguments: definition.arguments,
      properties,
      definition,
    }
  }

  getJob (jobId: string): RoboCloudJob {
    return new RoboCloudJob(jobId, this)
  }
}
