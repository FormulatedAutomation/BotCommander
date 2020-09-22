import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import * as config from '../../config/api'

import {getToken, Token} from '../token'

export interface BotCommandContext {
  bots: object
  acl: object
  sources: object
  token: Token
}

export function setup(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommandContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      getToken(req).then((token) => {
        const context = {
          acl: config.acl,
          bots: config.bots,
          sources: config.sources,
          token: token,
        }
        resolve(
          handler(req, res, context)
        )
      }).catch((e) => reject(e))
    })
  }
}

export function ensureLoggedIn(handler: (req: NextApiRequest, res: NextApiResponse,
  context?: BotCommandContext) => void | Promise<void>) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Handling")
    return new Promise((resolve, reject)=>{
      console.log("Promise")
      getToken(req).then((token) => {
        const context = {
          acl: config.acl,
          bots: config.bots,
          sources: config.sources,
          token: token,
        }
        if (!token) {
          res.statusCode = 401
          res.json({Error: "Must Be Authenticated"})
          return
        }
        resolve(
          handler(req, res, context)
        )
      }).catch((e) => reject(e))
    })
  }
}