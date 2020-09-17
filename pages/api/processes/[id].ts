import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../lib/token'
import processes from '../../../config/processes'
import sources from '../../../config/sources'
import authenticate from '../../../middleware/authenticate'
import { UiPathProcess } from '../../../lib/Process'

export const handler = async (req: NextApiRequest, res: NextApiResponse, token: Token) => {
  // TODO: Authorize, not just authenticate
  if (!token) {
    res.statusCode = 401
    res.json({Error: "Not Authorized"})
    return
  }
  let process = null
  for (let name in processes) {
    if (name === req.query.id) {
      process = new UiPathProcess(name, processes[name], sources['uipath'])
    }
  }
  await process.info()
  res.statusCode = 200
  res.json(process.processInfo)
}

export default authenticate(handler)