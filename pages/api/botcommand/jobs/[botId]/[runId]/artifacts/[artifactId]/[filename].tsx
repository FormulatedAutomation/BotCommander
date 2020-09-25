import { RoboCloudJob, UiPathJob } from '../../../../../../../../server/models/Job'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommandContext, ensureLoggedIn } from '../../../../../../../../server/middleware/context'
import { BotsConfig } from '../../../../../../../../lib/config'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  const id: string = Array.isArray(req.query.runId) ? req.query.runId[0]: req.query.runId
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0]: req.query.botId
  const runId: string = Array.isArray(req.query.runId) ? req.query.runId[0]: req.query.runId
  const artifactId: string = Array.isArray(req.query.artifactId) ? req.query.artifactId[0]: req.query.artifactId
  const filename: string = Array.isArray(req.query.filename) ? req.query.filename[0]: req.query.filename

  const job = new RoboCloudJob(botId, bots[botId], id)
  // TODO: @mdp pipe the artifact download directly to the response
  // match the content-type headers and this should be seamless
  res.statusCode = 200
  res.json({Error: 'To Be Implemented'})
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