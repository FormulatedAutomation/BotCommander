import { cloneElement } from 'react';
import UiPathAPI from '../services/uipath';
import { Job, JobState } from './Job';

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

  constructor(jobKey: string, api: UiPathAPI) {
    super();
    this.api = api;
    this.jobKey = jobKey;
    this.authenticated = false;
  }

  // Deserialize odd fields like the inputs and outputs
  deserialize(jobInfoJSON: any): UiPathJobInfo {
    const result = Object.assign({}, jobInfoJSON)
    result.InputArguments = JSON.parse(jobInfoJSON.InputArguments);
    result.OutputArguments = JSON.parse(jobInfoJSON.OutputArguments);
    return result
  }

  // Normalize the states
  state(state: string): JobState {
    if (state === 'Successful') {
      return JobState.Complete;
    } else if (state === 'Pending') {
      return JobState.Pending;
    }
    return JobState.Failed;
  }

  async properties(force?: boolean) {
    // get the processes information and store it on the class instance
    // Don't refetch unless it's forced
    if (this.jobInfo && !force) {
      return this.jobInfo;
    }
    const jobInfo = await this.api.status(this.jobKey);
    this.jobInfo = this.deserialize(jobInfo);
    return {
      id: this.jobKey,
      state: JobState[this.state(this.jobInfo.State)],
      info: this.jobInfo
    };
  }


}
