import dotenv from 'dotenv'
dotenv.config()

import {get as getSecret} from '../config/secret'
import {acl, bots, sources} from '../config/api'
import { Bot } from '../server/models/Bot'
import { ACL } from './acl'

export interface BotConfig {
  id: string
  type: string
  source?: string
  
  // Speficic to Robocloud
  workspaceId?: string
  processId?: string
  secret?: string
  [x: string]: any 
}

interface Config {
  secret: string
  acl: ACL
  bots: Bot[]
}

let cached: boolean | Config = false

export async function get(): Promise<Config> {
  // Allow for async setup later on if needed
  const botInstances = bots.map((bot) => Bot.createFromConfig(bot, sources))
  if (!cached) {
    cached = {
      secret: await getSecret(),
      acl: new ACL(acl, botInstances),
      bots: botInstances
    }
  }
  return new Promise(((res, rej) => res(<Config> cached)))
}

export default {
  get
}

