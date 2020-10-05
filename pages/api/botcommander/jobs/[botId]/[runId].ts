import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommanderContext) => {
  const { bots } = context
  const id: string = Array.isArray(req.query.runId) ? req.query.runId[0] : req.query.runId
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0] : req.query.botId
  const bot = bots.find((b) => b.id === botId)
  const job = bot.getJob(id)
  const info = await job.properties()
  res.statusCode = 200
  res.json(info)
}

export default ensureLoggedIn(handler)
