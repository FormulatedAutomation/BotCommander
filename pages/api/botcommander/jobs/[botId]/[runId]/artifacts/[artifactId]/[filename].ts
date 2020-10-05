import { RoboCloudJob } from '../../../../../../../../server/models/RoboCloudJob'
import { NextApiRequest, NextApiResponse } from 'next'
import { BotCommanderContext, ensureLoggedIn } from '../../../../../../../../server/middleware/context'

const handler = async (req: NextApiRequest, res: NextApiResponse, context: BotCommanderContext) => {
  const { bots } = context
  const botId: string = Array.isArray(req.query.botId) ? req.query.botId[0] : req.query.botId
  const runId: string = Array.isArray(req.query.runId) ? req.query.runId[0] : req.query.runId
  const artifactId: string = Array.isArray(req.query.artifactId) ? req.query.artifactId[0] : req.query.artifactId
  const filename: string = Array.isArray(req.query.filename) ? req.query.filename[0] : req.query.filename
  const bot = bots.find(({ id }) => botId === id)

  const job = new RoboCloudJob(runId, bot)
  const response = await job.getArtifact(runId, artifactId, filename)
  if (response.status === 200) {
    res.setHeader('content-type', response.headers.get('content-type'))
    res.setHeader('content-length', response.headers.get('content-length'))
    response.body.pipe(res)
    res.on('close', () => (res.end()))
    res.on('error', () => (res.end()))
  } else {
    res.status(500)
    res.json({ Error: 'Unable to download artifact' })
  }
}

export default ensureLoggedIn(handler)
