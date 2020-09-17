
import { NextApiRequest, NextApiResponse } from 'next'
import { Token } from '../../../lib/token'
import sources from '../../../config/sources'
import authenticate from '../../../middleware/authenticate'
import { UiPathJob } from '../../../lib/Job'

export const handler = async (req: NextApiRequest, res: NextApiResponse, token: Token) => {
  // TODO: Authorize, not just authenticate
  if (!token) {
    res.statusCode = 401
    res.json({Error: "Not Authorized"})
    return
  }
  console.log(req.query.id)
  const id: string = Array.isArray(req.query.id) ? req.query.id[0]: req.query.id
  const job = new UiPathJob(id, sources['uipath'])
  console.log(await job.info())
  res.statusCode = 200
  res.json(job.jobInfo)
}

export default authenticate(handler)