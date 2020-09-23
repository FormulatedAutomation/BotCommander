import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import {BotsConfig, get as getConfig} from '../../lib/config'

import {getToken, Token} from '../token'

export interface BotCommandContext {
  bots: BotsConfig
  acl: object
  sources: object
  token: Token
}

async function getContext(req: NextApiRequest): Promise<BotCommandContext> {
  const token = await getToken(req)
  const config = await getConfig()
  return {
    acl: config.acl,
    bots: config.bots,
    sources: config.sources,
    token: token,
  }
}

export function setup(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommandContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      return getContext(req)
        .then((context) => handler(req, res, context))
        .catch((e) => reject(e))
    })
  }
}

export function ensureLoggedIn(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommandContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      return getContext(req)
        .then((ctx) => {
          if (!ctx.token) {
            res.statusCode = 401
            res.json({ Error: "Must Be Authenticated" })
            return null
          }
          return handler(req, res, ctx)
        })
        .catch((e) => reject(e))
    })
  }
}