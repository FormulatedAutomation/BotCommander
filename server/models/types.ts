// Very generic at the moment
export interface BotObject {
  id: string
  name: string
  description: string
  type: string
  source: string
  properties: {
    [key: string]: any
  }
  definition: {
    [key: string]: any
  }
  arguments?: {
    input: BotArgument[]
    output: BotArgument[]
  }
}

export interface BotArgument {
  name: string
  type: string
  [key: string]: any
}

// Very generic at the moment
export interface JobObject {
  id: string
  state: string
  properties: any
  arguments?: {
    input: BotArgument[]
    output: BotArgument[]
  }
  artifacts?: any
}

export interface UiPathBotInfo {
  InputArguments: UiPathArgument[]
  OutputArguments: []
  State: string
  Key: string
}

export interface UiPathArgument {
  name: string
  type: string
  [key: string]: any
}
