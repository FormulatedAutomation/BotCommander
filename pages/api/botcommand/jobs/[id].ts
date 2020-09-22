import { UiPathJob } from '../../../../server/models/Job'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommandContext, ensureLoggedIn } from '../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources} = context
  console.log(req.query.id)
  const id: string = Array.isArray(req.query.id) ? req.query.id[0]: req.query.id
  const job = new UiPathJob(id, sources['uipath'])
  console.log(await job.info())
  res.statusCode = 200
  res.json(job.jobInfo)
}

export default ensureLoggedIn(handler)