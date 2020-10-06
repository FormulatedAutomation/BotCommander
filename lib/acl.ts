import { Bot } from '../server/models/Bot'
// Handles determining what resources we can access
// Expects a list of processes and a list of user ACLs

import { Token } from '../server/token'

// Test to see if the string where using looks like it's a regex
const regexStringMatch = /^\/.+\/[i]?$/
const regexSplatEmailMatch = /^\*@[a-z0-9.]+$/

// Return a regex object from a string
function regexify (str: string) {
  if (regexStringMatch.test(str)) {
    const parts = str.split('/')
    parts.shift()
    return RegExp(parts[0], parts[1])
  } else if (regexSplatEmailMatch.test(str)) {
    const parts = str.split('@')
    const emailRegex = RegExp(`^[A-Z0-9._\\-+\\%]+@${parts[1]}$`, 'i')
    return RegExp(emailRegex)
  }
  return RegExp(`^${str}$`, 'i')
}

interface ACLs {
  groups: {
    [key: string]: {
      emails: string[]
    }
  }
}

export class ACL {
  acl: ACLs
  bots: Bot[]

  constructor (acl: any, bots: Bot[]) {
    this.acl = acl
    this.bots = bots
  }

  // Get back a list of bots that a user is allowed to use
  listBots (token: Token | null): Bot[] {
    if (!token) {
      return []
    }
    const allowedBots = []
    for (const bot of this.bots) {
      const botAclGroups = bot.botConfig.acl.groups
      let botAllowed = false
      for (const group of botAclGroups) {
        const acl = this.acl.groups[group]
        for (const email of acl.emails) {
          const regex = regexify(email)
          if (regex.test(token.email)) {
            allowedBots.push(bot)
            botAllowed = true
            break
          }
        }
        if (botAllowed) { break }
      }
    }
    return allowedBots
  }

  // Returns a Boolean noting is a user is able to access a process
  isAllowed (token: Token, botId: string): boolean {
    const bot = this.bots.find((b) => botId === b.id)
    const botAclGroups = bot.botConfig.acl.groups
    for (const group of botAclGroups) {
      const acl = this.acl.groups[group]
      for (const email of acl.emails) {
        const regex = regexify(email)
        if (regex.test(token.email)) {
          return true
        }
      }
    }
    return false
  }
}
