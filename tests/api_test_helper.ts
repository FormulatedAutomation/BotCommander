import { get as getConfig } from '../lib/config'
import { buildToken, Token } from '../server/token'
import { BotCommanderContext } from '../server/middleware/context'

const ONE_MONTH = 20 * 24 * 60 * 60

function buildFakeToken (email: string): Token {
  return {
    email,
    name: 'Test User Token',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + ONE_MONTH,
  }
}

export async function loggedInContext (email: string): Promise<BotCommanderContext> {
  const config = await getConfig()
  return {
    acl: config.acl,
    bots: config.bots,
    token: buildFakeToken(email),
  }
}

export async function authedCookie (email: string): Promise<string> {
  const token = buildFakeToken(email)
  const jwtToken = await buildToken(token)
  const cookieStr = `next-auth.session-token=${jwtToken}; __Secure-next-auth.session-token=${jwtToken}`
  return cookieStr
}
