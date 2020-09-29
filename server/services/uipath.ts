import Orchestrator from 'uipath-orchestrator'
import { Bot } from '../models/Bot'

export default class UiPathAPI {
  findJob(jobKey: string): object | PromiseLike<object> {
    throw new Error('Method not implemented.')
  }
  api: Orchestrator

  constructor(source: object) {
    this.api = new Orchestrator(source)
  }

  async start(startData: object) {
    return new Promise((res, rej) => {
      const url = '/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs'
      this.api.post(url, startData, (err, data) => {
        if (err) {
          return rej(err)
        }
        res(data)
      })
    })
  }

  async status(jobId: string): Promise<object> {
    return new Promise((res, rej) => {
      const url = `/odata/Jobs`
      const query = {
        '$filter': `Id eq ${jobId}`,
      }
      this.api.get(url, query, (err, data) => {
        if (err) {
          return rej(err)
        }
        if (data['value'] && data['value'].length > 0) {
          res(data['value'][0])
        } else {
          rej({Error: 'No results', _result: data})
        }
      })
    })
  }

  async findByProcessKey(processKey: string): Promise<object> {
    return new Promise((res, rej) => {
      const url = '/odata/Releases'
      const query = {
        '$filter': `ProcessKey eq '${processKey}'`
      }
      this.api.get(url, query, (err, data) => {
        if (err) {
          return rej(err)
        }
        if (data['value'] && data['value'].length > 0) {
          res(data['value'][0])
        } else {
          rej({Error: 'No results', _result: data})
        }
      })
    })
  }

}