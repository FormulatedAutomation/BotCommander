import {providers, processes, acl} from '../../../config/botcommand'
import BotCommand from '../../../server'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '../../../server/token'

function setup(req: NextApiRequest, res: NextApiResponse<any>) {
  const options = {
    providers,
    acl,
    processes,
  }
  getToken(req).then((token) => {
    BotCommand(req, res, token, options)
  })
}

export default (req: NextApiRequest, res: NextApiResponse<any>) => setup(req, res)