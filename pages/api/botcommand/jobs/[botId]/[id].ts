import { RoboCloudJob, UiPathJob } from '../../../../../server/models/Job'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommandContext, ensureLoggedIn } from '../../../../../server/middleware/context'
import { BotsConfig } from '../../../../../lib/config'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  const id: string = Array.isArray(req.query.id) ? req.query.id[0]: req.query.id
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0]: req.query.botId
  const job = getJob(botId, id, bots, sources)
  const info = await job.info()
  res.statusCode = 200
  res.json(info)
}

function getJob(botId, jobId, bots: BotsConfig, sources: object): UiPathJob | RoboCloudJob {
  const bot = bots[botId]
  if (bot.type === 'uipath') {
    return new UiPathJob(jobId, sources[bot.source])
  } 
  if (bot.type === 'robocloud')
   return new RoboCloudJob(botId, bot, jobId)
}


export default ensureLoggedIn(handler)