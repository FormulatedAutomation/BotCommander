import { RoboCloudJob, UiPathJob } from '../../../../../../../../server/models/Job'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommandContext, ensureLoggedIn } from '../../../../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommandContext) => {
  const {sources, bots} = context
  const id: string = Array.isArray(req.query.runId) ? req.query.runId[0]: req.query.runId
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0]: req.query.botId
  const runId: string = Array.isArray(req.query.runId) ? req.query.runId[0]: req.query.runId
  const artifactId: string = Array.isArray(req.query.artifactId) ? req.query.artifactId[0]: req.query.artifactId
  const filename: string = Array.isArray(req.query.filename) ? req.query.filename[0]: req.query.filename

  const job = new RoboCloudJob(botId, bots[botId], id)
  const response = await job.getArtifact(runId, artifactId, filename)
  res.setHeader('content-type', response.headers.get('content-type'))
  res.setHeader('content-length', response.headers.get('content-length'))
  response.body.pipe(res)
  res.on('close', ()=>(res.end()))
}

export default ensureLoggedIn(handler)