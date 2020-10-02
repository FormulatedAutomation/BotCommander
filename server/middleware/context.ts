import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { ACL } from '../../lib/acl'
import {get as getConfig} from '../../lib/config'
import logger from '../../lib/logging'
import { Bot } from "../models/Bot"

import {getToken, Token} from '../token'

export interface BotCommanderContext {
  bots: Bot[]
  acl: ACL
  token: Token
}

async function getContext(req: NextApiRequest): Promise<BotCommanderContext> {
  const token = await getToken(req)
  const config = await getConfig()
  return {
    acl: config.acl,
    bots: config.acl.listBots(token),
    token,
  }
}

export function setup(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommanderContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      return getContext(req)
        .then((context) => handler(req, res, context))
        .catch((e) => reject(e))
    })
  }
}

export function ensureLoggedIn(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommanderContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      return getContext(req)
        .then((ctx) => {
          if (!ctx.token) {
            res.statusCode = 401
            res.json({ Error: "Must Be Authenticated" })
            logger.info("Authenticated Request Failed", {})
            return null
          }
          logger.info("Authenticated Request", {user: ctx.token, path: req.url})
          return handler(req, res, ctx)
        })
        .catch((e) => reject(e))
    })
  }
}