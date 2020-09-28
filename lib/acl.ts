// Handles determining what resources we can access
// Expects a list of processes and a list of user ACLs

import { Token } from "../server/token"

// Test to see if the string where using looks like it's a regex
const regexStringMatch = /^\/.+\/[i]?$/

// Return a regex object from a string
function regexify(str: string) {
  if (regexStringMatch.test(str)) {
    const parts = str.split('/')
    parts.shift()
    return RegExp(parts[0], parts[1])
  }
  return RegExp(`^${str}$`, 'i')
}

export class ACL {

  acl: object
  _acl: object
  bots: object

  constructor(acl, bots) {
    this.acl = acl
    this.bots = bots
  }

  // Returns a Boolean noting is a user is able to access a process
  isAllowed(token: Token, botId: string): boolean {
    const bot = this.bots[botId]
    const botAclGroups = bot.acl.groups
    for (let group of botAclGroups) {
      let acl = this.acl['groups'][group]
      for (let email of acl.emails) {
        let regex = regexify(email)
        if (regex.test(token.email)) {
          return true
        }
      }
    }
    return false
  }

}