import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

import {getToken, Token} from '../lib/token'

export default (handler: (req: NextApiRequest, res: NextApiResponse, token: Token) => void | Promise<void>) => {
  // Get the current user with the token
  // Authorize them for use of this resource
  // Find the bot
  // Fetch the bot details from the API
  return (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise((resolve, reject)=>{
      getToken(req).then((token) => {
        resolve(
          handler(req, res, token)
        )
      }).catch((e) => reject(e))
    })
  }
}