import { get as getConfig } from '../lib/config'
import { Token } from '../server/token'
import { BotCommandContext } from "../server/middleware/context";

export async function loggedInContext(email: string): Promise<BotCommandContext> {
  const config = await getConfig()
  return {
    acl: config.acl,
    bots: config.bots,
    token: {
      email,
      name: 'Test User Token',
      iat: 9999999999,
      exp: 9999999999,
    }
  }

}