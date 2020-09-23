import dotenv from 'dotenv'
dotenv.config()

import {get as getSecret} from '../config/secret'
import {acl, bots, sources} from '../config/api'

export interface BotConfig {
  type: string
  source?: string
  [x: string]: any 
}

export interface BotsConfig {
  [x: string]: BotConfig
}

interface Config {
  secret: string
  acl: object
  bots: BotsConfig
  sources: object
}

let cached: boolean | Config = false

export async function get(): Promise<Config> {
  // Allow for async setup later on if needed
  if (!cached) {
    cached = {
      secret: await getSecret(),
      acl,
      bots: bots,
      sources,
    }
  }
  return new Promise(((res, rej) => res(<Config> cached)))
}

export default {
  get
}

