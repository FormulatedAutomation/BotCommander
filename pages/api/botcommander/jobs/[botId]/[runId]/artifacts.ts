import { RoboCloudJob } from '../../../../../../server/models/RoboCloudJob'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommanderContext) => {
  const { bots } = context
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0] : req.query.botId
  const runId: string = Array.isArray(req.query.runId) ? req.query.runId[0] : req.query.runId
  const bot = bots.find(({ id }) => botId === id)

  const job = new RoboCloudJob(runId, bot)

  const response = await job.artifacts(runId)
  res.statusCode = 200
  res.json(response)
}

export default ensureLoggedIn(handler)
