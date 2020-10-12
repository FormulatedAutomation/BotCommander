import UiPathAPI from '../services/uipath'
import { Job, JobState } from './Job'
import { JobObject } from './types'

export interface UiPathJobInfo {
  InputArguments: object
  OutputArguments: object
  State: string
}

export class UiPathJob extends Job {
  api: UiPathAPI;
  jobKey: string;
  authenticated: boolean;
  jobInfo: UiPathJobInfo;

  constructor (jobKey: string, api: UiPathAPI) {
    super()
    this.api = api
    this.jobKey = jobKey
    this.authenticated = false
  }

  // Deserialize odd fields like the inputs and outputs
  deserialize (jobInfoJSON: any): void {
    this.arguments = {
      input: JSON.parse(jobInfoJSON.InputArguments),
      output: JSON.parse(jobInfoJSON.OutputArguments),
    }
  }

  // Normalize the states
  state (state: string): JobState {
    if (state === 'Successful') {
      return JobState.Complete
    } else if (state === 'Pending') {
      return JobState.Pending
    } else if (state === 'Running') {
      return JobState.Pending
    }
    return JobState.Failed
  }

  async toJSON (forceRefresh?: boolean): Promise<JobObject> {
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
    if (!this.jobInfo || forceRefresh) {
      this.jobInfo = await this.api.status(this.jobKey)
      this.deserialize(this.jobInfo)
    }
    return {
      id: this.jobKey,
      state: JobState[this.state(this.jobInfo.State)],
      properties: this.jobInfo,
      arguments: this.arguments,
    }
  }
}
